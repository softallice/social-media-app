<template>
    <page>
        <page-header>
            <template #title>QR-Generator</template>
        </page-header>
        <page-body>
            <generate-qrcode />
        </page-body>
    </page>
</template>
<script>

export default {
    name: 'QrGenerateor',
    components: {
        'generate-qrcode': require('components/Qrcodes/GenerateQrcode').default
    }
}
</script>
