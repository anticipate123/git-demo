<template>
  <div>
	<Tabs type="card" :animated="false">
		<TabPane  label="快速载波检测">
			<coarse-detection></coarse-detection>
		</TabPane>
		<TabPane label="精确载波检测">
			<fine-detection></fine-detection>
		</TabPane>
		<TabPane label="载波特征识别">
			<recognition></recognition>
		</TabPane>
	</Tabs>
  </div>
</template>

<script>
    import coarseDetection from '../components/coarseDetection'
    import fineDetection from '../components/fineDetection'
    import recognition from '../components/recognition'
    export default {
        components: {
            coarseDetection,
            fineDetection,
            recognition
        },

        methods: {

        }
    }
</script>

<style>

</style>