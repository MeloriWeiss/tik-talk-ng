import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  HostListener,
  input, output,
  signal,
  viewChild,
} from '@angular/core';
import { AvatarCircleComponent, PortalComponent } from '../index';

@Component({
  selector: 'tt-editable-avatar-circle',
  imports: [PortalComponent],
  templateUrl: './editable-avatar-circle.component.html',
  styleUrl: './editable-avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableAvatarCircleComponent {
  canEdit = input(false);
  fileLoaded = output<File>();

  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  avatarCircle = contentChild(AvatarCircleComponent);

  isMouseOver = signal(false);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isMouseOver.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseOver.set(false);
  }

  onAvatarClick() {
    if (!this.canEdit()) return;

    this.fileInput().nativeElement.click();
  }

  onUploadImage(event: Event) {
    if (!this.canEdit()) return;

    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.avatarCircle()?.resultAvatarUrl.set(
        event.target?.result?.toString() ?? ''
      );

      this.fileLoaded.emit(file);
    };

    reader.readAsDataURL(file);
  }
}
