const dateFormatter = ( object)=>{
    Object.keys(object).forEach(element => {
        if (element === 'timestapm')
        console.log(typeof object[element])
    });
};

export default dateFormatter;