<template>
  <div class="blog-list">
    <template v-for="(post, index) in posts">
      <div :key="index" class="blog-preview">
        <nuxt-link :to="'/'+ post.title">{{ post.title }}</nuxt-link>
        XXXXXXXXXXXXXXXX
      </div>
    </template>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      posts: [
        {
          title: '2016-10-24-tests'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        },
        {
          title: 'www'
        }
      ]
    }
  }
}
</script>

<style>
.blog-list {
  width: 100%;
}
.blog-preview {
  width: 80%;

}
</style>
