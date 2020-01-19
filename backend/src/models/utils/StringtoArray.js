module.exports = function ToArray(techs){
        return techs.split(',').map(tech => tech.trim());
    };
