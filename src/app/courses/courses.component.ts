import { Component, OnInit, Input } from '@angular/core';
import { Courses } from './courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  course: Courses;
  ngOnInit(): void {
    this.course = {
      id: '1',
      title: 'Angular',
      description: 'for beginner',
      tags: ['Informatique'],
    };
  }
}
