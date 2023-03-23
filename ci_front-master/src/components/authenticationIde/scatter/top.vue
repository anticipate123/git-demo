<template>
  <div>
  <div class="template-container">
    <div style="width: 100%; height:34vh;">
      <Form :label-width="100">
                <Form-item label="用户A :" >
                  <Progress :width="240" :progress="88" :strokeWidth="10" :showInfo="true" />
                </Form-item>
                <Form-item label="用户B :">
                  <Progress :width="240" :progress="44" :strokeWidth="10" :showInfo="true" />
                </Form-item>
                <Form-item label="其他用户 :">
                  <Progress :width="240" :progress="36" :strokeWidth="10" :showInfo="true" />
                </Form-item>
            </Form>
    </div>
  </div>
  </div>
</template>

<script>

import Progress from './Progress'
export default {

  components: {
    Progress
},
  data() {
    return {
    
    };
  },
  watch: {

   
  },
  methods: {
    
  },
  mounted() {}
};
</script>
