import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seek-dashboard',
  templateUrl: './seek-dashboard.component.html',
  styleUrls: ['./seek-dashboard.component.scss'],
})
export class SeekDashboardComponent implements OnInit {
  allCategory: any;
  allCourses: any;
  numofcourses: number = 0;
  allCategoryData: any;
  allCoursesData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://seek-frontend-default-rtdb.asia-southeast1.firebasedatabase.app/all_categories.json')
      .subscribe((data: any) => {
        this.allCategoryData = data?.payload;
        this.allCategory = data?.payload;
        console.log(this.allCategory);
      });
    this.http
      .get('https://seek-frontend-default-rtdb.asia-southeast1.firebasedatabase.app/all_courses.json')
      .subscribe((data: any) => {
        this.allCoursesData = data?.payload;
        this.allCourses = this.allCoursesData;
        console.log(this.allCourses);
        this.numofcourses = this.allCourses.length;
        this.datetime();
      });
  }
  datetime() {
    this.allCoursesData.forEach((element: any) => {
      const startdata = new Date(element.start_date);
      element.startMonth = startdata.toLocaleString('default', { month: 'long' });
      element.startDate = startdata.getDate();

      const enddata = new Date(element.end_date);
      element.endMonth = enddata.toLocaleString('default', { month: 'long' });
      element.endDate = enddata.getDate();
      element.duration = this.getWeeksDiff(startdata, enddata);
      console.log(element.startMonth, element.startDate, element.endMonth, element.endDate);
    });
  }

  searchTable(searchTerm: any) {
    this.allCourses = this.allCoursesData.filter(
      (value: any) =>
        value?.instructor_name?.toLowerCase().includes(searchTerm.value?.toLowerCase()) ||
        value?.description?.toLowerCase().includes(searchTerm.value?.toLowerCase()) ||
        value?.title?.toLowerCase().includes(searchTerm.value?.toLowerCase())
    );
    this.numofcourses = this.allCourses.length;
  }

  filter(selectedItem: any) {
    if (selectedItem.value != 'All') {
      this.allCourses = this.allCoursesData.filter(
        (value: any) => value?.category?.toLowerCase() == selectedItem.value?.toLowerCase()
      );
      this.numofcourses = this.allCourses.length;
    } else {
      this.allCourses = this.allCoursesData;
      this.numofcourses = this.allCourses.length;
    }
  }
  getWeeksDiff(startDate: any, endDate: any) {
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.round(Math.abs(endDate - startDate) / msInWeek);
  }
}