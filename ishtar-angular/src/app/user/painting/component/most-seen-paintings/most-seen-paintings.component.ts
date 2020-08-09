import {Component, OnInit} from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {MostViewedListItem} from '../../entity/most-viewed-list-item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-most-seen-paintings',
  templateUrl: './most-seen-paintings.component.html',
  styleUrls: ['./most-seen-paintings.component.scss']
})
export class MostSeenPaintingsComponent implements OnInit {
  mostViewedData: MostViewedListItem[];

  constructor(private paintingService: PaintingService,
              private router: Router) {
  }

  ngOnInit() {
    this.paintingService.getMostViewedPaintings().subscribe(
      mostViewedItems => {
        this.mostViewedData = mostViewedItems.slice(0, 3);
      }
    );
  }
}
