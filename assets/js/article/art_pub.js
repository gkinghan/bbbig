$(function() {
    var state = '已发布'



    // 初始化富文本编辑器
    initEditor()
    $.get(`/my/article/cates`, function(res) {
            if (res.state === 0) {
                var strHtml = template('cate', res)
                $('[name=cate_id]').html(strHTML)
                layui.form.render()
            }
        })
        // 1.初始化图片剪裁器
    var $image = $('#image')
        // 剪裁选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview',
        }
        // 初始化剪裁区域
    $image.cropper(options)

    $('#chooseImage').click(function() {
        $('#file').click()
    })

    $('#file').change(function(e) {
            var fd = e.target.files[0]
            console.log(fd)
            var newImgURL = URL.createObjectURL(fd)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        //   表单提交
    $('#formPub').submit(function(e) {
        e.preventDefault()
            // 根据form数据去实例化FormData数据
        var fd = new FormData($(this)[0])
            // console.log(fd['title']);

        fd.append('state', state)

        fd.forEach(function(v, k) {
            console.log(k, v)
        })
    })
})