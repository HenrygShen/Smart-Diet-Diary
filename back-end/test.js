const fs=  require('fs');


const unlink = () => {
    fs.unlinkSync('./image.jpg');
}

unlink();