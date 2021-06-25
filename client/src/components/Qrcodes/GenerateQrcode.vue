<template>    
    <div class="q-pa-md row items-start q-gutter-md ">
        <q-card class="qr-card ">
            <q-card-section>
                <div class="text-h6 q-mb-xs">
                    <q-icon name="schedule" />
                    {{timerCount ? '남은 시간 : ' : '인증 유효시간 초과'}} {{ timerCount ? timerCount : '' }}
                </div>
                <div class="row no-wrap items-center">
                <span class="text-caption text-grey q-ml-sm">유효 시간이 경과되면 다시 발급받으세요</span>
                </div>
            </q-card-section>
            <q-card-section>
                <div v-if="timerCount" class= "row justify-around">
                    <qrcode-vue :value="qrValue" :size="size" level="H" />
                </div>
                <div v-else class="row justify-around">
                    <q-img 
                        src="../../assets/img/logo.png"
                        class="qr-bg"
                    />
                        <q-btn 
                            class="absolute"
                            round 
                            color="secondary" 
                            icon="update" 
                            size="35px"
                            style="top: 125px; transform: translateY(-50%); opacity: 0.9;"
                            @click="refresh"
                        />
                    
                </div>  
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import { date } from 'quasar'

  export default {
    data() {
      return {
        timerEnabled: true,
        maxTry: 3,
        timerCount: 15,
        qrValue: JSON.stringify({
            vaccine: 'Covid-19',
            lotNo: 'CTB2937',
            vaccinationDate: '2021/05/26',
            vaccinationCountry: '대한민국',
            name: '비공개',
            birth: '비공개',
            country: '비공개',
            limit: '123456789',
            time: '1234567890123'
        }),
        size: 250,
      }
    },
    watch: {
        timerEnabled(value) {
            if (value) {
                setTimeout(() => {
                    this.timerCount--;
                }, 1000);
            }
        },
        timerCount: {
            handler(value) {
                if (value > 0 ) {
                    setTimeout(() => {
                        this.timerCount--
                    }, 1000)
                }
            },
            immediate: true
        },
    },
    methods: {
        play() {
            this.timerEnabled = true
        },
        stop() {
            this.timerEnabled = false
        },
        refresh() {
            this.timerEnabled = true
            this.timerCount = 15
            this.qrValue = JSON.stringify({
                vaccine: 'Covid-19',
                lotNo: 'CTB2937',
                vaccinationDate: '2021/05/26',
                vaccinationCountry: '대한민국',
                name: '비공개',
                birth: '비공개',
                country: '비공개',
                limit: '123456789',
                time: this.timeCheck()
            })
            // '{ "did": "https://example.com", "limit": "202020202220", "time": "'+ this.timeCheck() + '"}'
        },
        timeCheck() {
            let timeStamp = Date.now()
            let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
            return formattedString
        }
    },
    components: {
      QrcodeVue,
    },
  }
</script>
<style lang="sass" scoped>
.qr-card
  width: 100%,
  height: 400px

.qr-bg
  width: 300px,
  heigh: 300px,
  opacity: 0.8,
  filter: brightness(0.9)
</style>