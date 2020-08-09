import {Component, ElementRef, LOCALE_ID, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {ActivatedRoute} from '@angular/router';
import {ArtistService} from '../../../artist/service/artist.service';
import {ArtistDetails} from '../../../artist/entity/artist-details';
import {PaintingDetails} from '../../entity/painting-details';
import {Meta, Title} from '@angular/platform-browser';
import {CartService} from 'src/app/user/shared/cart/service/cart.service';


@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss', '../../../shared/interaction-follow/component/follow/follow.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaintingDetailsComponent implements OnInit {
  @ViewChild('mainImg', {read: ElementRef, static: true}) mainImg: ElementRef;
  @ViewChild('fullSizeImg', {read: ElementRef, static: true}) fullSizeImg: ElementRef;
  painting: PaintingDetails;
  artist: ArtistDetails;
  secondaryPaintings: { secondImage: string }[] = [];
  fullImage = false;

  constructor(private paintingService: PaintingService,
              private artistService: ArtistService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private meta: Meta) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      urlSegments => {
        console.log(JSON.stringify(urlSegments));
        this.paintingService.getPainting(Number(urlSegments.id)).subscribe(
          paintingResponse => {
            this.painting = paintingResponse;
            this.setSeo(paintingResponse);
            // Loop To Catch The Secondary Images For This Painting
            for (let num = 2; num < 6; num++) {
              if (this.painting[num]) {
                this.secondaryPaintings.push({
                  secondImage: this.painting[num].image
                });
              }
            }
            // Fetch Artist For This Painting
            this.artistService.getArtist(this.painting.artistID).subscribe(
              artistResponse => {
                this.artist = artistResponse;
              }
            );
          }
        );
      }
    );
  }

  setMainPainting(event) {
    // Get THe Current Target Element
    const target = event.target || event.srcElement || event.currentTarget;
    // Get THe Current Target Src
    const paintingSrc = target.attributes.src;
    const value = paintingSrc.nodeValue;          // Get src attribute for Current Element
    this.mainImg.nativeElement.src = value;       // Set The src attribute value to MainImage
    this.fullSizeImg.nativeElement.src = value;   // Set The src attribute value to FullSizeImage
  }

  showImageInFullSize() {
    this.fullImage = true;  // Display Painting In Full Size
  }

  hideFullScreenMode() {
    this.fullImage = false;   // Exit From Painting Full Size
  }

  addToCart() {
    this.cartService.addPaintingToCart(this.painting);
  }

  setSeo(painting: PaintingDetails) {
    this.titleService.setTitle(`${painting.name} | Ishtar-Art`);
    this.meta.addTag({ name: 'title', content: `${painting.name} | Ishtar-Art`});
    this.meta.addTag({ name: 'description', content: `${painting.story}`});
  }
}
