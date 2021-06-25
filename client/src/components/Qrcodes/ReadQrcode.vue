
<template>
  <div>
      <!-- <h6 class="text-center ">Scan your qrcode</h6> -->
      <q-btn 
          color="secondary" 
          label="다이얼로그" 
          @click="seamless = true"
      />
      <div class="stream">
            <qr-stream
                :camera="camera"
                @decode="onDecode"
                @init="onInit"
                :torch="flashActive"
            >
                
            </qr-stream>
            <div v-if="camera === 'off'" >
                <q-btn 
                    @click="turnCameraOn"
                    color="secondary" 
                    label="카메라켜기" 
                />
            </div>
            
            <div v-if="error" class="text-center">{{ error }}</div>
            <!-- Flash Button  -->
            <!-- <div v-if="flash" class="text-center">
                <q-btn 
                    color="secondary" 
                    label="플래시" 
                    @click="flashActive = !flashActive"
                />
            </div> -->
            <!-- Results  -->
            <!-- <div v-if="result">
                <q-input
                    v-model="result"
                    filled
                    type="textarea"
                />
                <q-btn 
                    color="secondary" 
                    label="복사" 
                    @click="seamless = true"
                />
            </div> -->
        </div>
        <div >
          <q-dialog 
            v-model="seamless" 
            seamless 
            position="bottom"
             >
              <q-card :style="$q.screen.lt.sm ? `max-width: 500px` : `min-width: 500px` " class="result-card" >
                  <q-linear-progress :value="1" color="secondary" />
                  <q-card-section class="row items-center q-pb-none">
                      <div class="text-h6 q-mb-xs">Certificate Infomation</div>
                      <q-space />
                      <q-btn icon="close" flat round dense v-close-popup />
  <!--                     
                      <div class="row no-wrap items-center">
                          <q-rating size="18px" v-model="stars" :max="5" color="primary" />
                          <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
                      </div> 
                      -->
                  </q-card-section>

                  <q-card-section class="items-center no-wrap" >
                    <div class="q-gutter-sm">
                      <div class="row">
                        <div class="col text-h6 text-center">
                          1회/아스트라제네카
                        </div>
                      </div>
                      <div class="row text-size-12">
                        <div class="col text-weight-bold">백신</div>
                        <div class="col text-weight-bold">{{parseResult.vaccine}}</div>
                        <div class="col text-weight-bold">롯트번호</div>
                        <div class="col text-weight-bold">{{parseResult.lotNo}}</div>
                      </div>
                      <div class="row text-size-12">
                        <div class="col text-weight-bold">접종일자</div>
                        <div class="col text-weight-bold">{{parseResult.vaccinationDate}}</div>
                        <div class="col text-weight-bold">접종국가</div>
                        <div class="col text-weight-bold">{{parseResult.vaccinationCountry}}</div>
                      </div>
                      <div class="row text-size-12">
                        <div class="col text-weight-bold">성명</div>
                        <div class="col text-weight-bold text-red-6">{{parseResult.name}}</div>
                        <div class="col text-weight-bold">생년월일</div>
                        <div class="col text-weight-bold text-red-6">{{parseResult.birth}}</div>
                      </div>
                      <div class="row text-size-12">
                        <div class="col text-weight-bold">접종국가</div>
                        <div class="col text-weight-bold text-red-6 ">{{parseResult.country}}</div>
                        <div class="col text-weight-bold">제한횟수</div>
                        <div class="col text-weight-bold">{{parseResult.limit}}</div>
                      </div>
                      <div class="row text-size-12">
                        <div class="col text-weight-bold">타임스탬프</div>
                        <div class="col text-weight-bold">{{parseResult.time}}</div>
                      </div>
                  </div>
                  <!-- <q-space />
                  <q-btn flat round icon="close" v-close-popup /> -->
                  </q-card-section>
              </q-card>
          </q-dialog>
        </div>
  </div>
</template>

<script>

import { QrStream} from 'vue3-qr-reader'
import qrMixin from "../mixins/qrMixin"

export default {
  mixins: [qrMixin],
  components: {
      QrStream, 
  },
  data() {
    return {
      camera: "auto",
      copied: false,
      error: "",
      flash: false,
      flashActive: false,
      seamless: false,
      parseResult: {
            vaccine: 'Covid-19',
            lotNo: 'CTB2937',
            vaccinationDate: '2021/05/26',
            vaccinationCountry: '대한민국',
            name: '비공개',
            birth: '비공개',
            country: '비공개',
            limit: '123456789',
            time: '1234567890123'
      }
    }
  },
  watch: {
      result(value) {
          console.log(value)
        try {
            this.parseResult = JSON.parse(value)
        } catch (e) {
            console.log(e)
        }        
        this.seamless = true
        this.showNotif()
      }
  },
  methods: {
    onDecode(data) {
      this.result = data
    //   this.turnCameraOff()
    //   this.playBeep()
      this.addQrData()
    },
    turnCameraOff() {
      this.camera = "off"
    },
    turnCameraOn() {
      this.camera = "auto"
      this.copied = false
      this.result = null
    },
    async copy() {
      await this.copyText(this.result).then((res) => {
        if (res) {
          this.copied = true
        }
      })
    },
    async onInit(promise) {
      try {
        const { capabilities } = await promise
        this.flash = capabilities.torch
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device. Try upload option."
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    showNotif ( ) {
      this.$q.notify({
        message: '인증되었습니다.',
        textColor: 'white',
        color: 'secondary',
        // icon: 'inventory',
        position: 'center',
        multiLine: true,
        // timeout: 2500,
        // avatar: 'https://cdn.quasar.dev/img/avatar.png',
        // actions: [
        //   { label: '확인', color: 'yellow', handler: () => { /* ... */ } }
        // ]
      })
    }
  },
  activated() {
    this.turnCameraOn()
  },
  deactivated() {
    this.turnCameraOff()
  }
}
</script>

<style scoped>
.stream {
  max-height: 500px;
  max-width: 500px;
  margin: auto;
  border-radius: 10px;
}
.frame {
  border-style: solid;
  border-width: 2px;
  border-color: red;
  height: 200px;
  width: 200px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
}
.result-card {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>