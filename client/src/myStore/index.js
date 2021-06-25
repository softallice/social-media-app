import { reactive } from 'vue'

const state = reactive({
  navItems: [
    {
      root: '/home',
      to: '/home',
      icon: 'las la-home',
      label: 'Home'
    },
    {
      root: '/posts',
      to: '/posts',
      icon: 'las la-photo-video',
      label: 'Posts'
    },
    {
      root: '/questions',
      to: '/questions',
      icon: 'las la-question-circle',
      label: 'Questions'
    },
    {
      root: '/images',
      to: '/images',
      icon: 'las la-image',
      label: 'Images'
    },
    {
      root: '/qreader',
      to: '/qreader',
      icon: 'qr_code_scanner',
      label: 'QrReader'
    },
    {
      root: '/qgenerator',
      to: '/qgenerator',
      icon: 'fact_check',
      label: 'QrGenerator'
    },
    {
      root: '/mobile',
      to: '/mobile',
      icon: 'local_see',
      label: 'MobileTest'
    }
  ],
  images: [
    {
      id: 'id1',
      url: '/images/1.jpg',
      caption: 'Tiger'
    },
    {
      id: 'id2',
      url: '/images/2.jpg',
      caption: 'Man'
    },
    {
      id: 'id3',
      url: '/images/3.jpg',
      caption: 'Mountains'
    },
    {
      id: 'id4',
      url: '/images/4.jpg',
      caption: 'Road in Mountains'
    },
    {
      id: 'id5',
      url: '/images/5.jpg',
      caption: 'Nightime Hills'
    },
    {
      id: 'id6',
      url: '/images/6.jpg',
      caption: 'Cute dog'
    }
  ],
  posts: [
    {
        id: '1',
        desc: "Love For All, Hatred For None.",
        photo: "post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 32,
        comment: 9,
    },
    {
        id: '2',
        photo: "post/2.jpeg",
        date: "15 mins ago",
        userId: 2,
        like: 2,
        comment: 1,
    },
    {
        id: '3',
        desc: "Every moment is a fresh beginning.",
        photo: "post/3.jpeg",
        date: "1 hour ago",
        userId: 3,
        like: 61,
        comment: 2,
    },
    {
        id: '4',
        photo: "post/4.jpeg",
        date: "4 hours ago",
        userId: 4,
        like: 7,
        comment: 3,
    },
    {
        id: '5',
        photo: "post/5.jpeg",
        date: "5 hours ago",
        userId: 5,
        like: 23,
        comment: 5,
    },
    {
        id: '6',
        photo: "post/6.jpeg",
        date: "1 day ago",
        userId: 6,
        like: 44,
        comment: 6,
    },
    {
        id: '7',
        desc: "Never regret anything that made you smile.",
        photo: "post/7.jpeg",
        date: "2 days ago",
        userId: 7,
        like: 52,
        comment: 3,
    },
    {
        id: '8',
        photo: "post/8.jpeg",
        date: "3 days ago",
        userId: 8,
        like: 15,
        comment: 1,
    },
    {
        id: '9',
        desc: "Change the world by being yourself.",
        photo: "post/9.jpeg",
        date: "5 days ago",
        userId: 9,
        like: 11,
        comment: 2,
    },
    {
        id: '10',
        photo: "post/10.jpeg",
        date: "1 week ago",
        userId: 10,
        like: 104,
        comment: 12,
    },
  ],
  likes: [
    {
      id: '1',
      postId: '1',
      userId: '1'
    },
    {
      id: '2',
      postId: '1',
      userId: '1'
    },
    {
      id: '3',
      postId: '2',
      userId: '1'
    },
    {
      id: '4',
      postId: '3',
      userId: '1'
    },
    {
      id: '5',
      postId: '2',
      userId: '1'
    },
    {
      id: '6',
      postId: '2',
      userId: '1'
    },
    {
      id: '7',
      postId: '2',
      userId: '1'
    },
    {
      id: '8',
      postId: '2',
      userId: '1'
    },
    {
      id: '9',
      postId: '2',
      userId: '1'
    }
  ],
  hearts: [
    {
      id: '1',
      postId: '3',
      userId: '1'
    },
    {
      id: '2',
      postId: '3',
      userId: '1'
    },
    {
      id: '3',
      postId: '2',
      userId: '1'
    },
    {
      id: '4',
      postId: '5',
      userId: '1'
    },
    {
      id: '5',
      postId: '2',
      userId: '1'
    },
    {
      id: '6',
      postId: '2',
      userId: '1'
    },
    {
      id: '7',
      postId: '2',
      userId: '1'
    },
    {
      id: '8',
      postId: '4',
      userId: '1'
    },
    {
      id: '9',
      postId: '2',
      userId: '1'
    }
  ],
  comments: [
    {
      id: '1',
      postId:'1',
      userId: '10',
      userName: 'jane',
      comment: '사진 잘 찍었네.. 멋져'
    },
    {
      id: '2',
      postId:'1',
      userId: '1',
      userName: 'tom',
      comment: '어디서 찍은거야 ?'
    },
    {
      id: '3',
      postId:'1',
      userId: '2',
      userName: 'Doe',
      comment: '어떤 카메라로 찍은거야 ?'
    },
    {
      id: '4',
      postId:'1',
      userId: '3',
      userName: 'jhon',
      comment: '어느 나라?????'
    },
    {
      id: '5',
      postId:'2',
      userId: '3',
      userName: 'emit',
      comment: '두번째 포스팅 코멘트'
    },
  ],
  usePageTransition: false,
  iosBrowserSwipingBack: false
})



const getters = {
  getImage(imageId) {
    return state.images.filter(image => image.id === imageId)[0]
  },
  getPostImage(postId) {
    return state.posts.filter(post => post.id === postId)[0]
  },
  getPostComment(postId) {
    return state.comments.filter(comment => comment.postId === postId)
  },
  getPostLike(postId) {
    return state.likes.filter(like => like.postId === postId)
  },
  getPostHeart(postId) {
    return state.hearts.filter(heart => heart.postId === postId)
  }
}
// actions
const actions = {
  setPostComment(postId, userId, userName, comment) {
    console.log('setPostComment', comment)
    state.comments.push({
      id: state.comments.length + 1,
      postId: postId,
      userId: userId,
      userName: userName,
      comment: comment
    })
  },
  setPostAdd( desc ) {
    console.log('setPostAdd', desc)
    state.posts.push({
      id: (state.posts.length + 1).toString(),
      desc: desc,
      photo: "post/3.jpeg",
      date: "1 mins ago",
      userId: 3,
      like: 0,
      comment: 0,
    })
  }
}

const store = {
  state,
  getters,
  actions
}

export default store