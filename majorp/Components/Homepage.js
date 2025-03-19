import Header from "./Header"; 
import HeroSection from "./hero-section";
import MovieSection from "./movie-section";
import TrailersSection from "./trailers-section";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4">
        <HeroSection />
        <TrailersSection />

        <MovieSection title="Critics Top Rated" movies={criticsTopRated} viewAllLink="#" />

        <MovieSection title="Movies in Theatres" movies={moviesInTheatres} viewAllLink="#" />

        <MovieSection title="Coming soon to theaters" movies={comingSoon} viewAllLink="#" />

        <MovieSection title="Explore Upcoming Movies" movies={upcomingMovies} viewAllLink="#" />
      </main>
      <footer className="py-6 text-center text-white/60">© 2024 Movie Review Website. All rights reserved.</footer>
    </div>
  )
}




// Movie data
const criticsTopRated = [
  {
    id: 1,
    title: "Breaking Bad",
    genre: "Action/Thriller",
    language: "English",
    image:
      "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    description:
      "A high school chemistry teacher diagnosed with cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
    rating: 9.5,
    year: 2008,
    platforms: ["Netflix", "Amazon Prime"],
  },
  {
    id: 2,
    title: "Game of Thrones",
    genre: "Action/Drama",
    language: "English",
    image:
      "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
    description:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    rating: 9.2,
    year: 2011,
    platforms: ["HBO Max", "Disney+"],
  },
  {
    id: 3,
    title: "Friends",
    genre: "Sitcom",
    language: "English",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    description:
      "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    rating: 8.9,
    year: 1994,
    platforms: ["Netflix", "HBO Max"],
  },
  {
    id: 4,
    title: "Brooklyn 99",
    genre: "Sitcom",
    language: "English",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_.jpg",
    description:
      "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.",
    rating: 8.4,
    year: 2013,
    platforms: ["Netflix", "Hulu"],
  }
]

const moviesInTheatres = [
  {
    id: 5,
    title: "Game Changer",
    genre: "Action/Thriller",
    language: "Telugu",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTYsJBXkuugol7UDOKwzJ4kl2BA2YvuU1XGlH_9PHmTMAN2XMkwO1q-XrDhB5YHn3_CYVGCvg",
    rating: "8.2",
    description: "An action-packed thriller where a mysterious figure enters the world of crime to change the fate of an entire city. Filled with high-stakes action and mind-bending twists, this film will keep you on the edge of your seat.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 6,
    title: "Devara",
    genre: "Action/Thriller",
    language: "Telugu",
    image: "https://static.toiimg.com/thumb/msid-100360862,width-400,resizemode-4/100360862.jpg",
    rating: "8.5",
    description: "Devara follows the journey of a fearless hero who must battle against a corrupt system to save his loved ones. The film is packed with intense action sequences and a gripping narrative that explores themes of justice and revenge.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 7,
    title: "The Greatest of All Time",
    genre: "Action/Sci-fi",
    language: "Tamil",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQX2udUls-4Etg0VBdXbD5nHPbLhPfphuJeqxnqy8p0NU_YeusnmEHQRJd3p86A4TdvP944yQ",
    rating: "8.8",
    description: "In a world where technology and human capabilities merge, 'The Greatest of All Time' is a mind-bending sci-fi action movie about a superhuman who must face a series of challenges to save humanity from an impending apocalypse.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 8,
    title: "Deadpool 3",
    genre: "Action/Comedy",
    language: "English",
    image: "https://posterspy.com/wp-content/uploads/2022/10/DEADPOOL-3-POSTER-min.jpg",
    rating: "9.1",
    description: "The merc with a mouth returns for a third installment of epic mayhem, blending action, comedy, and some truly hilarious moments. Deadpool must confront a new villain while breaking the fourth wall with his signature humor and wit.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 9,
    title: "Lover",
    genre: "Drama",
    language: "Tamil",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToGY3KKett-Te9QzTgZxvYekN2QlxLzNI-4tJUJcjkBHyz88gZZkn5mq0WZvrfZXPrz8gZ",
    rating: "N/A",
    description: "A heartfelt Tamil drama that explores the complexities of love, relationships, and the struggles of young lovers facing societal expectations. The story revolves around two individuals navigating their love life amidst family pressures and emotional turmoil.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 10,
    title: "Bhool Bhulaiyaa 3",
    genre: "Horror/Comedy",
    language: "Hindi",
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSg-2WoAZSBhHugCoupjAW89mNBlm--n9bOL9wqh9yMinJmVZSJ",
    rating: "N/A",
    description: "The third installment in the 'Bhool Bhulaiyaa' franchise, combining horror and comedy. The film follows a group of friends who get trapped in a haunted mansion with a mystery to solve. Packed with laughs, spooky moments, and thrilling twists, it's a rollercoaster ride of fun.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 11,
    title: "KALKI",
    genre: "Action/Sci-fi",
    language: "Hindi",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kalki_2898_AD.jpg/220px-Kalki_2898_AD.jpg",
    rating: "N/A",
    description: "Set in a futuristic world, 'KALKI' is a high-octane sci-fi action film. The protagonist, a special agent with a mysterious past, must uncover a dark conspiracy that threatens the survival of humanity. Expect mind-bending action sequences, advanced tech, and a gripping storyline.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 12,
    title: "Lucky Bhaskar",
    genre: "Drama/Thriller",
    language: "Telugu",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS-ebpM2eCE5zokXPmVoXiqleuTSZzu_xueZygyefw5anVly2u7",
    rating: "N/A",
    description: "A thrilling drama that follows Bhaskar, a man who, after winning a large sum of money, gets entangled in a series of mysterious and dangerous events. As he tries to keep his luck intact, he discovers secrets that challenge his moral beliefs.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
]


const comingSoon = [
  {
    id: 9,
    title: "Lover",
    genre: "Drama",
    language: "Tamil",
    image: "https://example.com/image-lover.jpg",
    rating: "N/A",
    description: "A heartfelt Tamil drama that explores the complexities of love, relationships, and the struggles of young lovers facing societal expectations. The story revolves around two individuals navigating their love life amidst family pressures and emotional turmoil.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 10,
    title: "Bhool Bhulaiyaa 3",
    genre: "Horror/Comedy",
    language: "Hindi",
    image: "https://example.com/image-bhoolbhulaiyaa3.jpg",
    rating: "N/A",
    description: "The third installment in the 'Bhool Bhulaiyaa' franchise, combining horror and comedy. The film follows a group of friends who get trapped in a haunted mansion with a mystery to solve. Packed with laughs, spooky moments, and thrilling twists, it's a rollercoaster ride of fun.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 11,
    title: "KALKI",
    genre: "Action/Sci-fi",
    language: "Hindi",
    image: "https://example.com/image-kalki.jpg",
    rating: "N/A",
    description: "Set in a futuristic world, 'KALKI' is a high-octane sci-fi action film. The protagonist, a special agent with a mysterious past, must uncover a dark conspiracy that threatens the survival of humanity. Expect mind-bending action sequences, advanced tech, and a gripping storyline.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 12,
    title: "Lucky Bhaskar",
    genre: "Drama/Thriller",
    language: "Telugu",
    image: "https://example.com/image-luckybhaskar.jpg",
    rating: "N/A",
    description: "A thrilling drama that follows Bhaskar, a man who, after winning a large sum of money, gets entangled in a series of mysterious and dangerous events. As he tries to keep his luck intact, he discovers secrets that challenge his moral beliefs.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  
]

const upcomingMovies = [
  {
    id: 13,
    title: "Kantara 2",
    genre: "Action/Fantasy",
    language: "Kannada",
    image: "https://example.com/image-kantara2.jpg",
    rating: "N/A",
    description: "Kantara 2 takes viewers deeper into the mystical world where action and fantasy collide. The protagonist must face an ancient curse and fight against supernatural forces to protect his village. Filled with thrilling action sequences and fantasy elements, the film will leave you in awe.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 14,
    title: "Alkhanda 2",
    genre: "Action/Drama",
    language: "Telugu",
    image: "https://example.com/image-alkhanda2.jpg",
    rating: "N/A",
    description: "The highly anticipated sequel to 'Alkhanda', this movie continues the intense journey of its protagonist, who faces new challenges in the world of high-stakes action and drama. As he fights for justice, he must also contend with personal demons and unexpected alliances.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 15,
    title: "KGF 3",
    genre: "Action/Sci-fi",
    language: "Kannada",
    image: "https://example.com/image-kgf3.jpg",
    rating: "N/A",
    description: "The much-awaited third installment of the KGF saga, KGF 3 takes the action to an entirely new level. The protagonist, Rocky, is now caught in a war between futuristic technologies and traditional power struggles, making for a thrilling action and sci-fi experience.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  },
  {
    id: 16,
    title: "Vaarasudu",
    genre: "Action/Drama",
    language: "Telugu",
    image: "https://example.com/image-vaarasudu.jpg",
    rating: "N/A",
    description: "Vaarasudu is a gripping tale of a young man who must take up the mantle of leadership in his family after his father's untimely death. The film weaves together intense action and heartfelt drama, exploring themes of legacy, power, and responsibility.",
    year: "2025",
    platforms: ["Platform1", "Platform2"]
  }
]


