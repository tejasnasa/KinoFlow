import streamlit as st
import pickle

from streamlit import selectbox

st.title("KinoFlow Movie Recommender")

movie_list = pickle.load(open("movie_list.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))

selected_movie_name = st.selectbox("Choose a movie", movie_list["title"])

def recommend(movie):
    movie_index = movie_list[movie_list["title"] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[1:6]

    recommended_movies = []

    for i in movies_list:
        recommended_movies.append(movie_list.iloc[i[0]].title)
    return recommended_movies



if st.button("recommend"):
    recommendations = recommend(selected_movie_name)
    for i in recommendations:
        st.write(i)
