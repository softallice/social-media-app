<template>
  <q-page>
    <lottie src="lottie/ble.json" :height="200" />
    <!-- <Welcome v-model="welcome" /> -->

    <div
      v-if="$q.platform.is.capacitor"
      class="absolute fit column flex-center no-wrap"
    >
      <div class="column flex-center">
        <q-icon
          name="fab fa-bluetooth"
          :color="ble_enabled ? 'primary' : 'gray'"
          size="lg"
          class="q-ma-md"
        />
        Bluetooth is {{ ble_enabled ? 'Active' : 'Inactive' }}

        <q-btn
          :label="scanning ? 'Scanning...' : 'Start Scanning'"
          color="primary"
          :loading="scanning"
          :disable="!ble_enabled"
          class="q-ma-md"
          @click="scan"
        />
      </div>

      <div class="scroll">
        <q-list
          v-if="results.length"
          bordered
          separator
          class="rounded-borders"
        >
          <!-- <Result
            v-for="result in filtered_results"
            :key="result.device.deviceId"
            :result="result"
          /> -->
        </q-list>
        <span
          v-else-if="!scanning && tried_scanning"
          class="q-ma-lg text-subtitle1"
          >No devices found. Try again later!</span
        >
      </div>
      <q-btn
        v-if="results.length"
        :label="see_all ? 'Hide Unknown Devices' : 'See All'"
        flat
        color="primary"
        @click="see_all = !see_all"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { BleClient, ScanResult } from '../../../src-capacitor/node_modules/@capacitor-community/bluetooth-le'

import Lottie from 'components/Lottie.vue'

export default {
    name: 'Bles',
    components: { Lottie },
    setup() {
        const welcome = ref(true)
        // const results = ref<ScanResult>([])
        const results = ref([])

        
        const scanning = ref(false)
        const tried_scanning = ref(false)
        const ble_enabled = ref(false)
        const see_all = ref(false)
        const error = ref('')

        const init = async () => {
        try {
            
            await BleClient.initialize()
            alert('initial')
            ble_enabled.value = await BleClient.isEnabled()

            alert('ble_enabled.value',ble_enabled )

            await BleClient.startEnabledNotifications((enabled) => {
                ble_enabled.value = enabled
            })
            
        } catch (err) {
            console.log('init err ', err);
        }
        }

        const scan = async () => {
        results.value = []
        scanning.value = true
        tried_scanning.value = true

        try {
            await BleClient.requestLEScan({}, result => {
            results.value.push(result)
            })

            setTimeout(() => {
            void BleClient.stopLEScan().then(() => {
                scanning.value = false
            })
            }, 10000)
        } catch (err) {
            console.log('init err ', err);
        }
        }

        onMounted(init)

        return {
        welcome,
        results,
        scanning,
        tried_scanning,
        ble_enabled,
        see_all,
        error,
        scan
        }
    },
}
</script>
