
const xml = new XMLHttpRequest();
xml.open('get', 'http://127.0.0.1:7990/aaaaaaaaaaaaaa');
xml.send();
xml.onreadystatechange = function () {
  console.log(xml.readyState);
  if (xml.status === 200 && xml.readyState === 4) {
    console.log(xml.responseText);
    let res = JSON.parse(xml.responseText);
    console.log(res);
    let html = '';
    res.forEach(e => {
      html += `<tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.gender}</td>
            <td><img src="../extra/image/${e.img}"></td>
            <td><a href="./edit.html?id=${e.id}">修改</a>
              <a data-id="${e.id}" href="javascript:void(0);">删除</a>
            </td>
          </tr>`
    })
    document.querySelector('#tbody').innerHTML = html;
  }
}