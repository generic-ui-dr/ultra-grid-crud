import { Injectable } from '@angular/core';
import { FabricDialogService } from '@generic-ui/fabric';
import { UltraAddModalComponent } from './ultra-add-modal.component';

@Injectable()
export class UltraAddService {

	constructor(private readonly dialogService: FabricDialogService) {
	}

	open(): void {
		this.dialogService.open({ component: UltraAddModalComponent, width: '700px' });
	}

}
