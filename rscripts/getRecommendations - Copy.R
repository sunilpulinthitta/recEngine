args <- commandArgs(TRUE)

movieTitle <- args[1]

movies= read.csv("rscripts/movies.csv")
library(reshape2)
data= read.csv("rscripts/Book.csv")

#movies <- read.csv("movies.csv", header = TRUE, stringsAsFactors=FALSE)
#movies <- movies[with(movies, order(title)), ]
#ratings <- read.csv("ratings100k.csv", header = TRUE)


my.movie = movieTitle
my.age = 23
my.rating=5
data= rbind.data.frame(data, userId= data[nrow(data), 1]+1, Age=my.age, movieId= movies$movieId[movies$title==my.movie], rating=my.rating)

#Create ratings matrix. Rows = userId, Columns = movieId
ratingmat <- dcast(data, userId+Age~movieId, value.var = "rating", na.rm=FALSE)
ratingmat <- as.matrix(ratingmat[,-1]) #remove userIds

library(methods)
library(recommenderlab)

#Convert rating matrix into a recommenderlab sparse matrix
ratingmat <- as(ratingmat, "realRatingMatrix")

#Normalize the data
ratingmat_norm <- normalize(ratingmat)

#Create Recommender Model. "UBCF" stands for User-Based Collaborative Filtering
recommender_model <- Recommender(ratingmat_norm, method = "UBCF", param=list(method="Cosine",nn=30))
recom <- predict(recommender_model, ratingmat[data[nrow(data), 1]+1], n=10) #Obtain top 10 recommendations for 1st user in dataset
recom_list <- as(recom, "list") #convert recommenderlab object to readable list

#Obtain recommendations
recom_result <- matrix(0,10)
for (i in c(1:10)){
  recom_result[i]<- as.character(movies[recom_list[[1]][i],2])
}
#library(rjson)
#toJSON(recom_result)
recom_result