$('#box').click(function() {
  if(!this.className) $(this).addClass('rotate')
  else $(this).removeClass('rotate')
})
