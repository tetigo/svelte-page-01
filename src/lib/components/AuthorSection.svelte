
<script>
  import authorImage from '$assets/profile_pic.jpg';

  let authorPhrase1 = "Niklas Fischer is a seasoned expatriate with over seven years of experience living in Spain. Originally from New York, John left behind the hustle of corporate America to embrace a more fulfilling life on the sun-soaked coasts of Spain. Through his own journey, he has navigated the challenges of securing visas, finding the perfect home, and adapting to a new culture, making him an expert in the field of relocation.";
  let authorPhrase2 = "Niklas’ practical advice is rooted in real-life experience, having learned firsthand the intricacies of moving to a new country. His goal is to help others avoid common pitfalls and make their transition to life in Spain as smooth as possible. When not sharing his expertise, John enjoys exploring Spain’s rich culture and history, fully embracing the lifestyle he once dreamed of.";

</script>


<section class="author-section">
  <h2 class="mb-l">About the Author</h2>
  <div class="author-container">
    <div class="author-text">
      <p class="mb-xs">
        {authorPhrase1}
      </p>
      <p>
        {authorPhrase2}
      </p>;
      
    </div>
    <img class="author-image" src={authorImage} alt="Author" />
  </div>
</section>




<style>
    .author-section {
      padding: 50px 0;
      margin-left: 30%;
      /* margin-right: 20vw; */
      max-width: 1150px;
    }
    .author-container {
      display: flex;
      justify-content: space-between;
    }
  
    .author-container img {
      width: 40%;
      border: 6px solid black;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
    }
  
    .author-text p {
      margin-right: 18px;
    }
  </style>