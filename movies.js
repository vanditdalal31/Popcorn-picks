/* =========================================================
   movies.js
   Static, fully offline movie catalog for PopcornPicks.
   Each movie object powers the grid, modal, search,
   genre filters, and the "Recommended For You" rail.
   ========================================================= */

const MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description:
      "As Earth's resources dwindle, a former pilot leads a crew of explorers through a wormhole in search of a new home for humanity, racing against time and the limits of physics itself.",
    poster: "assets/posters/Interstellar.jpeg",
    trailer: "zSWdZVtXT7E",
    featured: true
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    description:
      "A skilled thief who steals secrets through dream-sharing technology is given a final job: plant an idea instead of stealing one, a task that blurs the line between dream and reality.",
    poster: "assets/posters/inception.jpg",
    trailer: "YoHD9XEInc0", 
    featured: false
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    description:
      "When the Joker unleashes chaos on Gotham, Batman must confront the fine line between heroism and vigilantism to stop a criminal mastermind who thrives on anarchy.",
    poster: "assets/posters/dark-knight.jpg",
    trailer: "EXeTwQWrcwY", 
    featured: true
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    duration: "3h 1m",
    director: "Anthony & Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    description:
      "The remaining Avengers assemble one final time, devising a desperate plan to undo the devastation caused by Thanos and restore balance to the universe.",
    poster: "assets/posters/endgame.jpg",
    trailer: "TcMBFSGVi1c",
    featured: false
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    year: 2022,
    genre: "Action",
    rating: 8.3,
    duration: "2h 11m",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    description:
      "Decades after earning his callsign, elite pilot Maverick must train a new generation of aviators for a near-impossible mission that will test everything he stands for.",
    poster: "assets/posters/top-gun-maverick.jpg",
    trailer: "giXco2jaZ_4",
    featured: false
  },
  {
    id: 6,
    title: "Dune",
    year: 2021,
    genre: "Sci-Fi",
    rating: 8.6,
    duration: "2h 35m",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    description:
      "The son of a noble family is thrust into a war for the desert planet Arrakis, discovering a destiny far greater than he ever imagined amidst treachery and prophecy.",
    poster: "assets/posters/dune.jpg",
    trailer: "n9xhJrPXop4",
    featured: true
  },
  {
    id: 7,
    title: "Coco",
    year: 2017,
    genre: "Animation",
    rating: 8.4,
    duration: "1h 45m",
    director: "Lee Unkrich",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt"],
    description:
      "A young boy with dreams of becoming a musician journeys into the vibrant Land of the Dead to uncover the truth about his family's mysterious history.",
    poster: "assets/posters/coco.jpg",
    trailer: "Rvr68u6k5sI",
    featured: false
  },
  {
    id: 8,
    title: "Soul",
    year: 2020,
    genre: "Animation",
    rating: 8.1,
    duration: "1h 40m",
    director: "Pete Docter",
    cast: ["Jamie Foxx", "Tina Fey", "Graham Norton"],
    description:
      "A jazz musician on the cusp of his big break finds his soul separated from his body, sending him on a journey through realms that redefine what truly makes life worth living.",
    poster: "assets/posters/soul.jpg",
    trailer: "xOsLIiBStEs",
    featured: false
  },
  {
    id: 9,
    title: "Toy Story",
    year: 1995,
    genre: "Animation",
    rating: 8.3,
    duration: "1h 21m",
    director: "John Lasseter",
    cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
    description:
      "A cowboy doll's world is turned upside down when a flashy new space ranger toy arrives, sparking a rivalry that leads both toys on an unforgettable adventure.",
    poster: "assets/posters/toy-story.jpeg",
    trailer: "KYz2wyBy3kc",
    featured: false
  },
  {
    id: 10,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    duration: "2h 22m",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    description:
      "A wrongfully convicted banker forms an unlikely friendship with a fellow inmate while quietly plotting an escape that spans nearly two decades of patience and hope.",
    poster: "assets/posters/shawshank.jpg",
    trailer: "NmzuHjWmXOc",
    featured: true
  },
  {
    id: 11,
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    rating: 8.8,
    duration: "2h 22m",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    description:
      "A kind-hearted man with a low IQ unwittingly finds himself at the center of several pivotal historical moments, all while chasing the one thing he truly loves.",
    poster: "assets/posters/forrest-gump.jpg",
    trailer: "bLvqoHBptjg",
    featured: false
  },
  {
    id: 12,
    title: "John Wick",
    year: 2014,
    genre: "Action",
    rating: 7.4,
    duration: "1h 41m",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"],
    description:
      "A retired hitman comes out of retirement to track down the gangsters that took everything from him, unleashing a legend the underworld thought was long gone.",
    poster: "assets/posters/john-wick.jpg",
    trailer: "2AUmvWm5ZDQ",
    featured: false
  },
  {
    id: 13,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action",
    rating: 8.1,
    duration: "2h 0m",
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    description:
      "In a scorched wasteland, a hardened survivor teams up with a rebellious warrior to outrun a tyrant across the desert, sparking one of cinema's most relentless chases.",
    poster: "assets/posters/mad-max.jpg",
    trailer: "hEJnMQG9ev8",
    featured: false
  },
  {
    id: 14,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genre: "Animation",
    rating: 8.4,
    duration: "1h 57m",
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
    description:
      "A teenager from Brooklyn becomes his universe's Spider-Man and teams up with alternate-dimension counterparts to save all of reality from a dangerous collider.",
    poster: "assets/posters/spider-verse.jpg",
    trailer: "g4Hbz2jLxvQ", 
    featured: false
  },
  {
    id: 15,
    title: "Harry Potter and the Sorcerer's Stone",
    year: 2001,
    genre: "Adventure",
    rating: 7.6,
    duration: "2h 32m",
    director: "Chris Columbus",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
    description:
      "An orphaned boy discovers he is a wizard on his eleventh birthday and enrolls at a school of magic, where an old mystery begins to resurface around him.",
    poster: "assets/posters/harry-potter.jpg",
    trailer: "VyHV0BRtdxo",
    featured: false
  },
  {
    id: 16,
    title: "Jurassic Park",
    year: 1993,
    genre: "Adventure",
    rating: 8.2,
    duration: "2h 7m",
    director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    description:
      "A theme park showcasing genetically resurrected dinosaurs descends into chaos, forcing a small group of survivors to outrun creatures nature never meant to see again.",
    poster: "assets/posters/jurassic-park.jpeg",
    trailer: "QWBKEmWWL38",
    featured: false
  },
  {
    id: 17,
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    year: 2003,
    genre: "Adventure",
    rating: 8.1,
    duration: "2h 23m",
    director: "Gore Verbinski",
    cast: ["Johnny Depp", "Geoffrey Rush", "Orlando Bloom"],
    description:
      "An eccentric pirate captain and a blacksmith join forces to rescue a governor's daughter from a cursed crew doomed to sail the seas for eternity.",
    poster: "assets/posters/pirates.jpg",
    trailer: "naQr0uTrH_s",
    featured: false
  },
  {
    id: 18,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 16m",
    director: "Lana & Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    description:
      "A computer programmer discovers that reality as he knows it is a simulation, and joins a rebellion to free humanity from machines that have enslaved the human mind.",
    poster: "assets/posters/matrix.jpeg",
    trailer: "vKQi3bBA1y8",
    featured: false
  },
  {
    id: 19,
    title: "Whiplash",
    year: 2014,
    genre: "Drama",
    rating: 8.5,
    duration: "1h 46m",
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser"],
    description:
      "An ambitious young drummer enrolls at a prestigious music conservatory, where a ruthless instructor pushes him to the edge of his sanity in pursuit of greatness.",
    poster: "assets/posters/whiplash.jpg",
    trailer: "7d_jQycdQGo", 
    featured: false
  },
  {
    id: 20,
    title: "The Green Mile",
    year: 1999,
    genre: "Drama",
    rating: 8.6,
    duration: "3h 9m",
    director: "Frank Darabont",
    cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"],
    description:
      "A death row prison guard witnesses inexplicable events after a gentle giant with a mysterious gift arrives on the block, testing his beliefs about justice and mercy.",
    poster: "assets/posters/green-mile.jpeg",
    trailer: "Ki4haFrqSrw", 
    featured: false
  },
  {
    id: 21,
    title: "The Conjuring",
    year: 2013,
    genre: "Horror",
    rating: 7.5,
    duration: "1h 52m",
    director: "James Wan",
    cast: ["Vera Farmiga", "Patrick Wilson", "Lili Taylor"],
    description:
      "Paranormal investigators are called to help a family terrorized by a dark presence in their farmhouse, uncovering a malevolent force rooted deep in its past.",
    poster: "assets/posters/conjuring.jpg",
    trailer: "k10ETZ41q5o", 
    featured: false
  },
  {
    id: 22,
    title: "A Quiet Place",
    year: 2018,
    genre: "Horror",
    rating: 7.5,
    duration: "1h 30m",
    director: "John Krasinski",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    description:
      "In a world hunted by creatures that track by sound, a family must live in near-total silence while fighting to protect one another from an ever-present threat.",
    poster: "assets/posters/quiet-place.jpeg",
    trailer: "WR7cc5t7tv8", 
    featured: true
  },
  {
    id: 23,
    title: "Get Out",
    year: 2017,
    genre: "Horror",
    rating: 7.7,
    duration: "1h 44m",
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Catherine Keener"],
    description:
      "A young man's visit to his girlfriend's family estate unravels a disturbing secret, transforming a simple weekend getaway into a fight for his life and identity.",
    poster: "assets/posters/get-out.jpg",
    trailer: "DzfpyUB60YY",
    featured: false
  },
  {
    id: 24,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: "Adventure",
    rating: 8.9,
    duration: "2h 58m",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    description:
      "A hobbit and eight companions set out on a perilous journey to destroy a powerful ring before it falls into the hands of a rising dark power bent on domination.",
    poster: "assets/posters/lotr.jpg",
    trailer: "V75dMMIW2B4", 
    featured: false
  },
  {
    id: 25,
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy",
    rating: 8.1,
    duration: "1h 39m",
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"],
    description:
      "A legendary concierge and his loyal lobby boy become entangled in a stolen painting, a fortune, and a family feud at a famed European hotel between the wars.",
    poster: "assets/posters/grand-budapest.jpg",
    trailer: "1Fg5iWmQjwk", 
    featured: false
  },
  {
    id: 26,
    title: "Guardians of the Galaxy",
    year: 2014,
    genre: "Comedy",
    rating: 8.0,
    duration: "2h 1m",
    director: "James Gunn",
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
    description:
      "A band of misfit outlaws from across the galaxy must learn to work together to stop a fanatical warrior from unleashing a weapon of unimaginable power.",
    poster: "assets/posters/guardians.jpg",
    trailer: "d96cjJhvlMA", 
    featured: false
  }
];
