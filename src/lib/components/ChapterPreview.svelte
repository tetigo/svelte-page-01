<script>
// @ts-nocheck

  const chapters = [
  {
    number: 1,
    title: "Navigating the Spanish Bureaucracy",
    strapline: "Understanding Visas, Residency, and Legal Essentials",
    excerpt:
      "Moving to Spain involves navigating a labyrinth of bureaucratic processes that can feel overwhelming at first. This chapter breaks down the essential steps required to secure your visa, establish residency, and handle other legal formalities. Whether you’re planning a short-term stay or seeking permanent residency, understanding Spain’s legal framework is crucial. We’ll explore the different types of visas available, from student to work visas, and provide tips on how to streamline your application process. Additionally, this chapter covers essential documentation, such as obtaining a Número de Identidad de Extranjero (NIE), which is your key to unlocking many services in Spain. We’ll also delve into the process of registering with the local town hall, known as empadronamiento, and the importance of understanding the tax implications of your move. Whether you’re a retiree, a digital nomad, or someone relocating for work, this chapter will guide you through the maze of paperwork and official procedures with practical advice and insider tips, ensuring that you’re legally prepared for your new life in Spain.",
  },
  {
    number: 2,
    title: "Finding Your Dream Home in Spain",
    strapline: "From Coastal Villas to Urban Apartments: Where and How to Live",
    excerpt: `
    Spain offers a diverse array of living options, from picturesque coastal towns to bustling city centers. This chapter is your guide to finding the perfect home that suits your lifestyle and budget. We’ll start by exploring Spain’s most popular regions for expats, highlighting the unique qualities of each. Whether you’re drawn to the cosmopolitan vibe of Madrid and Barcelona, the relaxed atmosphere of the Costa del Sol, or the cultural richness of Andalusia, understanding the local property market is key. We’ll discuss the pros and cons of renting versus buying, and provide practical advice on how to navigate Spain’s real estate market. You’ll learn about the different types of properties available, from modern apartments to traditional fincas, and the steps involved in securing a lease or purchase. We’ll also cover important considerations such as proximity to amenities, transportation, and local schools. This chapter will equip you with the knowledge to make an informed decision, ensuring that your new home in Spain meets all your expectations and provides a comfortable base for your new life.`,
  },
  {
    number: 3,
    title: "Mastering the Spanish Job Market",
    strapline: "Strategies for Employment and Freelancing in a New Culture",
    excerpt: `Finding a job in Spain can be a challenging but rewarding experience, especially if you’re not familiar with the local job market and work culture. This chapter provides a comprehensive overview of the employment landscape in Spain, offering strategies to help you secure a job or establish a successful freelance career. We’ll start by examining the sectors with the most opportunities for expats, such as tourism, education, technology, and healthcare. You’ll learn how to tailor your CV and cover letter to meet Spanish expectations, and we’ll provide tips on how to network effectively in a culture where personal connections often play a crucial role in job hunting. For those considering freelancing, we’ll explore the legal requirements for becoming autónomo, Spain’s version of self-employment, including tax obligations and social security contributions. Additionally, we’ll discuss the importance of learning Spanish to enhance your job prospects and integrate into the workplace. Whether you’re looking to climb the corporate ladder, start a business, or work remotely, this chapter offers valuable insights to help you navigate the Spanish job market successfully.`,
  },
  {
    number: 4,
    title: "Embracing the Spanish Lifestyle",
    strapline: "Cultural Norms, Social Etiquette, and Making New Connections",
    excerpt: `Moving to Spain isn’t just about changing your location; it’s about immersing yourself in a new way of life. This chapter explores the vibrant Spanish lifestyle, offering insights into cultural norms, social etiquette, and how to make meaningful connections in your new home. We’ll begin by discussing the importance of family and community in Spain, where relationships are often built around shared meals, festivals, and local traditions. You’ll learn about the Spanish concept of mañana, and how the relaxed approach to time influences daily life. We’ll also delve into social etiquette, from greeting people with a kiss on the cheek to navigating the intricacies of dining out. Whether you’re attending a local fiesta or joining a conversation at the neighborhood café, understanding these cultural nuances will help you integrate more easily. Additionally, we’ll offer tips on how to build a social network, whether through language classes, expat groups, or engaging in local hobbies and sports. By the end of this chapter, you’ll be well-prepared to embrace the rich, communal, and vibrant lifestyle that makes Spain so unique.`,
  },
  {
    number: 5,
    title: "Budgeting and Finances in Spain",
    strapline: "Managing Costs, Taxes, and Banking in Your New Home",
    excerpt: `Successfully managing your finances is crucial to enjoying a stress-free life in Spain. This chapter provides practical guidance on how to budget for your new life, manage your expenses, and navigate Spain’s financial systems. We’ll start by discussing the cost of living in different regions of Spain, from the more affordable countryside to the pricier urban centers. You’ll learn how to create a realistic budget that covers essentials such as housing, utilities, groceries, and healthcare, while also allowing for the enjoyment of Spain’s culinary delights and cultural activities. We’ll also delve into the Spanish banking system, offering tips on how to open a bank account, choose the right financial products, and understand local banking fees. Taxation is another key area we’ll cover, with explanations of how to file taxes as a resident or non-resident, and the implications of Spain’s tax treaties with other countries. Whether you’re planning to retire, work, or invest in Spain, this chapter will equip you with the financial knowledge to make the most of your resources and enjoy a comfortable life in your new home.`,
  },
];


const textForPaymentSuccess = ` <p class="light-grey mb-s">
    You've made a great decision by choosing this guide to help you on your
    journey to Spain. We’re confident that the insights and advice contained in
    this ebook will save you time, money, and unnecessary stress as you plan
    your move.
  </p>
  <p class="light-grey mb-s">
    An email with your ebook is on its way to your inbox, along with a separate
    purchase confirmation. Please keep an eye out for the email. If you don’t
    see them within the next few minutes, be sure to check your spam or
    promotions folder, just in case.
  </p>
  <p class="light-grey">
    We're here to support you every step of the way. If you have any questions
    or need further assistance, don’t hesitate to reach out. Enjoy your read and
    best of luck with your move!
  </p>`;

const textForPaymentFailure = `<p class="light-grey mb-s">
    We’re sorry, but it looks like there was an issue with your purchase. Don’t
    worry—these things happen, and we're here to help.Please double-check your
    payment details and try again.
  </p>
  <p class="light-grey mb-s">
    We apologize for any inconvenience this may have caused and appreciate your
    patience. We’re committed to ensuring that you get the guide you need to
    make your move to Spain as smooth as possible.
  </p>
  <p class="light-grey mb-m">
    If you’d like to try again, please click the button below to return to the
    checkout page.
  </p>`;


  let selectedChapterNumber = $state(1);
  let selectedChapter = $derived(chapters.find(chapter => chapter.number === selectedChapterNumber));
</script>


<section class="chapter-preview">
  <h2 class="mb-l">What you're getting</h2>
  <div class="chapter-container">
    <ul>
      {#each chapters as chapter}
      <li>
        <button
        onclick={() => selectedChapterNumber = chapter.number}
        class="chapter-title"
        aria-controls="chapter-info-{chapter.number}"
        class:selected-chapter-title={chapter.number === selectedChapterNumber}
        aria-expanded="{chapter.number === selectedChapterNumber}"
        >
        <h3>Chapter {chapter.number}: {chapter.title}</h3>
      </button>
      </li>
      {/each}
    </ul>
    <div class="chapter-info">
      <h3 class="chapter-strapline italic mb-s">
        {selectedChapter.strapline}
      </h3>
      <p>
        {selectedChapter.excerpt}
      </p>
    </div>
  </div>
</section>



<style>
    .chapter-preview {
      padding: 80px 0;
      margin-left: 30%;
      /* margin-right: 20vw; */
      max-width: 1150px;
    }
    .chapter-container {
      display: flex;
      justify-content: space-between;
    }
  
    .chapter-container ul {
      width: 40%;
    }
  
    .chapter-info {
      width: 55%;
    }
  
    .chapter-title {
      border-bottom: 1px solid grey;
      width: 100%;
      display: block;
      padding: 12px;
      text-align: left;
    }
  
    .selected-chapter-title {
      background-color: black;
      border: none;
      color: white;
      box-shadow:
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);
    }
  </style>