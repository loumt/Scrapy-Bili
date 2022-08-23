import DefaultController from "../src/controllers/DefaultController";

const jsonFile = require('jsonfile')
const fillPath = "D://China.json"

let result = []

class ChinaAreaUtil{
    constructor(fillPath){
        this.file = fillPath;
        this.result = []
    }

    build(level, code, name, province, city, area, town, full_name){
        // console.log(name)
        this.result.push({level, code, name, province, city, area, town, full_name})
    }

    parseTown(provinceCode, cityCode, areaCode, town){
        this.build(town.regionlevel, town.regioncode, town.regionname,  provinceCode, cityCode, areaCode, town.regioncode, town.fullname);
    }

    parseArea(provinceCode, cityCode, area){
        this.build(area.regionlevel, area.regioncode, area.regionname,  provinceCode, cityCode, area.regioncode, null, area.fullname);
        if(area.children && area.children.length > 0){
            for(let town of area.children){
                this.parseTown(provinceCode, cityCode, area.regioncode, town)
            }
        }
    }

    parseCity(provinceCode, city){
        this.build(city.regionlevel, city.regioncode, city.regionname,  provinceCode, city.regioncode, null, null, city.fullname);
        if(city.children && city.children.length > 0){
            for(let area of city.children){
                this.parseArea(provinceCode, city.regioncode, area)
            }
        }
    }

    parseProvince(province){
        this.build(province.regionlevel, province.regioncode, province.regionname,  province.regioncode, null, null, null, province.fullname);
        if(province.children && province.children.length > 0){
            for(let city of province.children){
                this.parseCity(province.regioncode, city)
            }
        }
    }

    parseData(datas){
        for(let data of datas){
            this.parseProvince(data)
        }
    }

    async init(){
        let data = await jsonFile.readFile(this.file)

        // console.dir(data)

        this.parseData(data.city)

        // console.log(this.result.length)
        return this.result;
    }
}

export default ChinaAreaUtil;


// (async function(){
//     let tool = new ChinaAreaUtil("D://China.json")
//     let result = await tool.init();
//
//     for(let item of result){
//         console.dir(item)
//     }
// })()

