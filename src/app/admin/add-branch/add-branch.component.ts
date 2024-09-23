import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Branch } from '../branch';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-branch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.scss',
})
export class AddBranchComponent implements OnInit {

  private adminService = inject(AdminService);
  private formBuilder = inject(FormBuilder);
  private route = inject(Router);
  private destroyRef = inject(DestroyRef);

  // branchForm = new FormGroup({
  //   bankName: new FormControl('HDFC', {
  //     validators: [Validators.required],
  //   }),
  //   branchName: new FormControl('', {
  //     validators: [Validators.required],
  //   }),
  //   branchCode: new FormControl('', {
  //     validators: [Validators.required],
  //   })
  // });

  branchForm!: FormGroup;

  ngOnInit(): void {
    this.branchForm = this.formBuilder.group({
      bankName: ['HDFC', Validators.required],
      branchName: ['', Validators.required],
      branchCode: ['', [Validators.required],[this.branchCodeValidator()]],
    });
  }

  onSubmit() {
    if (this.branchForm.valid) {
      const branchData: Branch = this.branchForm.value;
      const subscription = this.adminService.addNewBranch(branchData).subscribe((data) => {
        console.log(data);
        this.route.navigate(['/admin/branch-details']);
        this.branchForm.reset();
      });
      this.destroyRef.onDestroy(()=>subscription.unsubscribe());
    } else {
      this.makeAllInputTouched();
    }
  }

  branchCodeValidator():AsyncValidatorFn{
    return (control) => {
      return this.adminService.checkIfBranchCodeExists(control.value).pipe(
        map((response) => {
          return response ? { branchCodeExists: true } : null;
        })
      );
    }
  }

  makeAllInputTouched() {
    Object.values(this.branchForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  get branchNameRequired() {
    return (
      this.branchForm.get('branchName')?.touched &&
      this.branchForm.get('branchName')?.errors?.['required']
    );
  }

  get branchCodeRequired() {
    return (
      this.branchForm.get('branchCode')?.touched &&
      this.branchForm.get('branchCode')?.errors?.['required']
    );
  }

  get branchCodeExists() {
    return (
      this.branchForm.get('branchCode')?.touched &&
      this.branchForm.get('branchCode')?.errors?.['branchCodeExists']
    );
  }

  //get branchNameRequired(){
  //   return(
  //     this.branchForm.controls.branchName.touched &&
  //     this.branchForm.controls.branchName.errors?.['required']
  //   );
  // }

  // get branchCodeRequired(){
  //   return(
  //     this.branchForm.controls.branchCode.touched &&
  //     this.branchForm.controls.branchCode.errors?.['required']
  //   );
  // }
}
