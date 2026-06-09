
const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blog) => {
  const favBlog = blog.reduce((mostLiked, current) => mostLiked.likes > current.likes ? mostLiked : current )
  return favBlog
}

const mostBlogs = (arrayOfBlogs) => {
  const result = arrayOfBlogs.reduce((acc, blog) => {
    if(acc[blog.author]){
      acc[blog.author] += 1
    }
    else{
      acc[blog.author] = 1
    }
    return acc
  } , {})
  const authorWithMaxBlog =Object.entries(result).reduce((max, current) => max[1] > current[1] ? max : current)
  return {
    author : authorWithMaxBlog[0],
    blogs : authorWithMaxBlog[1]
  }
}   

const mostLikes =(blogs) => { 
  let result = blogs.reduce((acc,blog) => {
    if(acc[blog.author]){ 
      acc[blog.author] = acc[blog.author]  + blog.likes
      
    }
    else{ acc[blog.author] = blog.likes }
    return acc
  } ,{})
  
  
  result = Object.entries(result).reduce((acc, blog) =>  acc[1] > blog[1] ? acc : blog )
  return {
    author : result[0],
    likes: result[1]
  }
  
}

module.exports={ dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

