import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Share } from '@capacitor/share';
import { AnimationController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild("titulo", { read: ElementRef, static: true }) titulo!: ElementRef;

  nombreUsuario = localStorage.getItem('nombreUsuario');
  lectura: string | undefined;
  
  constructor(private animationCtrl: AnimationController, private alertController: AlertController, public router:Router) { }

  ngOnInit() {
    //this.avanzarDerecha();
    console.log('Nombre de usuario: ', this.nombreUsuario);

    this.crecer();
  }

  public avanzarDerecha() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.titulo.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(200px)')
      .fromTo('color', "blue", "red")
      .fromTo('opacity', '1', '0');

    animation.play();
  }

  public crecer() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.titulo.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .fromTo('transform', 'scale3d(1,1,1)', 'scale3d(1.5,1.5,1.5)')
      .fromTo("color", "green", "blue")
      .fromTo('opacity', '1', '0');

    animation.play();
  }

  compartirApp() {
    Share.share({
      title: 'Compartir myApp',
      url: 'https://duoc.cl/',
      dialogTitle: 'Es perfecta !',
    });
  }

  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.lectura = result.content;
    }
  } 

  cerrarSesion(){
    localStorage.removeItem('autenticado');
    window.location.href = '/login';
    
  }

}
