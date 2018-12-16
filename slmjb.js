$(function () {
 $(".bg-map .region2 a").click(function () {
   $(this).css({"background-position":"0 -94px"})
   $(".bg-map .region1 a").css({"background-position":"0 0"})
 })

$(".bg-map .region1 a").click(function () {
  $(this).css({"background-position":"0 -141px"})
  $(".bg-map .region2 a").css({"background-position":"0 -47px"})
})
 $(".mainBg .ranke2 a").click(function () {
   $(this).css({"background-position":"0 -141px"})
   $(".mainBg .ranke1 a").css({"background-position":"0 0"})
 })
  $(".mainBg .ranke1 a").click(function () {
    $(this).css({"background-position":"0 -47px"})
    $(".mainBg .ranke2 a").css({"background-position":"0 -94px"})
  })


//第一个下拉框
  var index=0
  $(".map-seleted1").click(function () {

    index++
    if(index%2==0){
      $(".seleted1").stop(true,false).hide()
    }else{
      $(".seleted1").stop(true,false).show()
    }
  })


  $(".map-seleted1").mouseleave(function () {
    $(".seleted1").stop(true,false).hide()
  })

  $(".map-seleted1 .seleted1 li").on("click",function () {
    var content=$(this).text()
    $(".map-seleted1 span").text(content)
  })

//第二个下拉框

  $(".map-seleted2").click(function () {

    index++
    if(index%2==0){
      $(".seleted2").stop(true,false).hide()
    }else{
      $(".seleted2").stop(true,false).show()
    }

  })

  $(".map-seleted2 .seleted2 li").on("click",function () {
    var content=$(this).text()
    $(".map-seleted2 span").text(content)
  })

//第三个下拉框

  $(".map-seleted2").mouseleave(function () {
    $(".bg-map .map-seleted2 .seleted2").stop(true,false).hide()
  })
  // var index=0
  // $(".appear").on("click",function () {
  //   $(this).find("ul").show().parent().siblings("div").find("ul").hide()
  //   index++
  //
  //
  // })

  $(".ranke-seleted").click(function () {

    index++
    if(index%2==0){
      $(".rankeUl").stop(true,false).hide()
    }else{
      $(".rankeUl").stop(true,false).show()
    }

  })
  $(".ranke-seleted .rankeUl li").on("click",function () {
    var content=$(this).text()
    $(".ranke-seleted span").text(content)
  })



  $(".ranke-seleted").mouseleave(function () {
    $(".mainBg .ranke-seleted .rankeUl").stop(true,false).hide()
  })
//切换地图
    $(".map2").on("click", function () {
        $(".mainBg .bg-map").addClass("active")
        $(".mainBg .bg-map .map-site").addClass("active")


    })
    $(".map1").on("click", function () {
        $(".mainBg .bg-map").removeClass("active")
        $(".mainBg .bg-map .map-site").removeClass("active")


    })




})




