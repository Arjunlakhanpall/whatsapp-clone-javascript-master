export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            this._stream = stream;
            this._videoEl.srcObject = stream;
            this._videoEl.play();

        }).catch(error => {

            console.error(error);
        });
    }
    /**parar a a captura de imagens */
    stop() {

        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    /**tirar fotogafia */
    takePicture(mimeType = 'img/png') {

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);

    }
}
