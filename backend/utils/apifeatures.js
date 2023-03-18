class Apifeatures{
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr 
    }

    search() {
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            }
          : {};
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
      }
    
    filter(){
        const queryCopy = {...this.queryStr}

        // Remove some fields for category
        const removeField = ["keyword","page","limit"]

        removeField.forEach(key=>delete queryCopy[key])

        // Filter price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // Pagination 
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
      }
 }
 module.exports = Apifeatures