import { Component, inject, OnInit } from '@angular/core';
import { Branch } from '../branch';
import { AdminService } from '../admin.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-branch-details',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent implements OnInit{

  branches!: Branch[];
  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.adminService.getAllBranches().subscribe( data => this.branches = data);
  }


}
