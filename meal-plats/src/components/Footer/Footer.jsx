import './Footer.css'

import {BsFacebook, BsTwitter, BsGithub, BsLinkedin} from "react-icons/bs";



const Footer = () => {

    return (

        <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">
                Mealplat est une application vous permetteant d'avoir un accès sur un ensemble de plats détaillées comme leurs ingrédients ainsi que leur nombre de calories.
                Vous pouvez en fonction de vos actvitées physique avoir accès à de nombreuses recettes correspondats à votre dépense énergétique.
            </p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
             
              <li>Accueil</li>
              <li>Suggestions</li>
              <li>Formulaire</li>
            </ul>
          </div>

          
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by Brendan, Thomas, Richard
        
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="https://fr-fr.facebook.com/" target="_blank" rel="noopener noreferrer"><i> <BsFacebook size={25}/></i></a></li>
              <li><a class="twitter" href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i> <BsTwitter size={25}/></i></a></li>
              <li><a class="github"  href="https://github.com/" target="_blank" rel="noopener noreferrer"><i> <BsGithub size={25}/></i></a></li>
              <li><a class="linkedin" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i> <BsLinkedin size={25}/></i></a></li>   
           
              
            </ul>
          </div>
        </div>
      </div>
</footer>
    )

}


export default Footer;

