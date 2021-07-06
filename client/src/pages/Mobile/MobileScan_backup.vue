<template>
    <page >
        <page-header>
            <template #title>QR-reader</template>
        </page-header>
        <page-body :class="ready ? 'bg-white' : 'flex flex-center transparent'">
            <div v-if="ready">
                {{imageURI}}    
            </div>
            
            <q-separator/>
            
            <div v-if="ready">
                <button v-if="authorized" class="secondary push" @click="goScan()">Go Scan</button>
            </div>
            
            <q-separator/>
            
            <div v-if="!ready" class="container">
                <!-- <q-img
                    :src="rect"
                /> -->
                <q-separator/>

                <q-btn color="primary" label="Cancel" @click="cancelScan()"/>
            </div>
        </page-body>
    </page>
</template>

<script>
// import { useQuasar } from 'quasar'
import { ref , onMounted } from 'vue'

export default {
    setup () {

        let ready = ref(true)
        let imageURI = ref('')
        let rect = 'scanner/rect.png'
        let authorized = ref(false)
        let selection = 'standard'
        let selectOptions = [
            {
            label: 'Camera-thumbnail',
            value: 'camera-thmb'
            },
            {
            label: 'Standard',
            value: 'standard'
            }
        ]
        let enableVisibility = 'hidden'
        let backColor = 'transparent'
        if (!window.QRScanner) {
           // Avoid error in web
            return;
        }

        onMounted(() => {
            prepDevice()
        })
    
        function prepDevice () {
            QRScanner.prepare(onDone)
        }

        function onDone (err, status) {
            if (err) {
                alert('preparing: error code = ' + err.code)
            }
            if (status.authorized) {
                authorized.value = true
            } else if (status.denied || !status.authorized) {
                openSettings()
            } else {
                console.log('onDone : ', onDone)
            }
        }

        function goScan () {
            authorized.value = false
            ready.value = false
            QRScanner.show()
            QRScanner.scan(displayContents)
        }

        function displayContents (err, text) {
            if (err) {
                alert('scanning: error code = ' + err.code)
                if (err.name === 'SCAN_CANCELED') {
                alert('The scan was cancelled before a QR code was found.')
                }
            } else {
                alert(text)
                imageURI.value = text
            }
            QRScanner.destroy()
            authorized = true
            ready = true
        }

        function cancelScan () {
            QRScanner.cancelScan()
            authorized = true
            ready = true
        }

        function openSettings () {
            if (status.canOpenSettings) {
                if (confirm('Would you like to enable QR code scanning? You can allow camera access in your settings.')) {
                    QRScanner.openSettings()
                }
            }
        }

        return {
            ready,
            authorized,
            imageURI,
            rect,
            goScan,
            cancelScan
        }
    }
}
</script>
<style scoped lang="scss">
  .container {
    flex:1;
    align-items: 'center'
  }
</style>