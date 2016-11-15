const getDocHeight = () => {
  let D = document
  return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight)
}

const validateEmail = (email) => {
  const filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
  if (filter.test(email)) {
    return true;
  } else {
    return false;
  }
}

$(document).ready(() => {

  const imgURL = 'https://s-media-cache-ak0.pinimg.com/736x/4b/fe/44/4bfe443c1db09c0943de27164783e4fc.jpg'
  const version = new Date()
  let userType = ''
  let testData = {
    'userType': '',
    'scrollToBottom': false,
    'clickSlideshow': false
  }
  let emailEntries = []
  let dataCollected = false

  //Set the source of each image and give valid version number
  $('.mediatate-image').each((index, e) => {
    $(e).attr('src', `${imgURL}?ver=${version.getTime() + index}`)
  })

  //Initialize carousel
  $('.carousel').carousel({
    interval: false
  });

  //Increment like count
  $('.btn-like').on('click', (e) => {
    let likeCount = parseInt($(e.currentTarget).find('.like-count').text()) + 1
    $(e.currentTarget).find('.like-count').text(likeCount)
  })

  //Form events
  $('.btn-email').on('click', (e) => {
    if (!validateEmail($('#email').val())) {
      $('.alert').fadeOut('fast', () => {
        $('.alert').removeClass('alert-success')
        $('.alert').addClass('alert-danger')
        $('.alert-heading').text('Email is not valid!')
        $('.mb-0').text('Please enter a valid email')
        $('.alert').fadeIn('fast')
      })
    } else if (validateEmail($('#email').val())) {
      $('.alert').fadeOut('fast', () => {
        $('.alert').removeClass('alert-danger')
        $('.alert').addClass('alert-success')
        $('.alert-heading').text('Email is valid!')
        $('.mb-0').text('Email address successfully submitted')
        $('.alert').fadeIn('fast', () => {
          setTimeout( () => {
            $('form').fadeOut('fast')
            $('.alert').fadeOut('fast')
            $('.padding-row').css({'padding-bottom':'7em'})
          }, 1000)
        })
      })
    }
  })

  //Check if testing page
  if (window.location.href.indexOf('test') > -1) {
    //Randomly pick user type
    Math.random() >= 0.5 ?
      userType = 'Control' :
      userType = 'Variation'

    testData.userType = userType

    //If user is variant we render the variant version
    if (userType === 'Variation') {
      $('.navbar-footer').before($('.carousel-wrapper').detach())
    }

    //Watch for user to scroll to the bottom
    $(window).scroll(() => {
      if ($(window).scrollTop() + $(window).height() == getDocHeight()) {
        testData.scrollToBottom = true
        if (testData.scrollToBottom && testData.clickSlideshow && !dataCollected) {
          console.log(testData);
          dataCollected = true
        }
      }
    })

    //Watch for slideshow interaction
    $('#hero-carousel').on('slide.bs.carousel', () => {
      testData.clickSlideshow = true
      if (testData.scrollToBottom && testData.clickSlideshow && !dataCollected) {
        console.log(testData);
        dataCollected = true
      }
    });
  }
})
