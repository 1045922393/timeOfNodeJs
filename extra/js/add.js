
let btn = document.querySelector('#sub');
let form = document.querySelector('#myform')
btn.addEventListener('click', () => {
    if (form.name.value) {
        let data = serialize("#myform")
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://127.0.0.1:7878/addHero?' + data);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                console.log(xhr.responseText);
            }
        }
    } else {
        alert('用户名不为空')
    }

})