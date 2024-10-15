import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the movie list and similarity data
movie_list = pickle.load(open("movie_list.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))

def recommend(movie_id):
    # Check if movie_id exists in the movie_list
    if movie_id not in movie_list["movie_id"].values:
        raise ValueError(f"Movie ID {movie_id} not found in movie list.")

    # Find the index of the movie based on the movie_id
    movie_index = movie_list[movie_list["movie_id"] == movie_id].index[0]
    distances = similarity[movie_index]

    # Get the top 5 similar movies
    movies_list = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[1:6]

    recommended_movie_ids = []
    for i in movies_list:
        # Convert numpy.int64 to Python int
        recommended_movie_ids.append(int(movie_list.iloc[i[0]].movie_id))
    return recommended_movie_ids

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    data = request.json
    movie_id = data.get('movie_id')

    if not movie_id:
        return jsonify({"error": "movie_id is required"}), 400

    try:
        # Get recommendations
        recommendations = recommend(movie_id)
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404  # Return a 404 error if the movie ID is not found

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
