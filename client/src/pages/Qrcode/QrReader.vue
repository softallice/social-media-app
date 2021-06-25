<template>
    <page>
        <page-header>
            <template #title>QR-reader</template>
        </page-header>
        <page-body>
            <read-qrcode />
        </page-body>
    </page>
</template>
<script>

export default {
    name: 'QrReader',
    components: {
        'read-qrcode': require('components/Qrcodes/ReadQrcode').default
    },
}
</script>
