function uploadFile(event){
    let target = event.target || event.currentTarget;
    let file = target.files[0];
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploads/'+file.name, true);
    xhr.onreadystatechange = function (){
        event = null;
        if(xhr.readyState == 200){
            if (xhr.status == 400){
                console.log('ok');
            }
            else{
                console.log('error');
            }
        }
    }
    xhr.send(file);
    event.target.value = '';
}

document.querySelector('#inpFile').addEventListener('change', uploadFile);