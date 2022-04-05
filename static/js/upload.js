function uploadFile(event){
    console.log('upload');
    let target = event.target || event.currentTarget;
    let file = target.files[0];

    console.log('file: ' + file.name);
    let xhr = new XMLHttpRequest();
    console.log(1);
    xhr.open('POST', '/uploads/'+file.name, true);
    console.log(2);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    console.log(3);
    console.log(xhr.onreadystatechange);
    xhr.onreadystatechange = function (){
        console.log('funczapros');
        event = null;
        if(xhr.readyState === 4){
            if (xhr.status === 200){
                console.log('ok');
                func(this.responseText);
            }
            else{
                console.log('error');
            }
        }
    }
    xhr.send(file);
    event.target.value = '';
}

function func(data){
    console.log(data);
}

document.querySelector('#f').addEventListener('change', uploadFile);
console.log(document.querySelector('#f'));