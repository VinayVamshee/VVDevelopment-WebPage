import './style.css'
import React, { useEffect, useState } from 'react'
import Logo from './Images/Google-Logo.png'
import axios from 'axios'

export default function StartUpPage() {

  const DefaultSite = [
    {
      SiteLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png',
      SiteName: 'Gmail',
      SiteUrl: 'https://mail.google.com/mail/u/0/#inbox',
      SiteCategory: 'General'
    },
    {
      SiteLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052',
      SiteName: 'Youtube',
      SiteUrl: 'https://www.youtube.com/',
      SiteCategory: 'MultiMedia'
    },
    {
      SiteLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
      SiteName: 'Amazon',
      SiteUrl: 'https://www.amazon.in/',
      SiteCategory: 'Other'
    },
  ]

  const [AllCategory, setAllCategory] = useState([]);

  useEffect(() => {
    axios.get('https://vv-development-web-page-server.vercel.app/GetCategory')
      .then(result => setAllCategory(result.data))
      .catch(error => console.log(error))
  }, []);

  const [SelectedCategory, setSelectedCategory] = useState({});

  const OpenCategory = (category) => {
    setSelectedCategory(category);
  }

  const CloseCategory = (e) => {
    e.preventDefault();
    setSelectedCategory({});
  }

  //Output Data
  const [AllSite, setAllSite] = useState([]);

  //Get Data from Backend MongoDB
  useEffect(() => {
    axios.get('https://vv-development-web-page-server.vercel.app/GetSites')
      .then(result => setAllSite(result.data))
      .catch(error => console.log(error))
  }, []);


  const googleSearch = (event) => {
    event.preventDefault();
    var text = document.getElementById("search").value;
    var cleanQuery = text.replace(" ", "+", text);
    var url = "http://www.google.com/search?q=" + cleanQuery;
    window.location.href = url;
  }

  return (

    <div className='StartUpPage'>


      <div className='Logo'>
        <img src={Logo} alt='...' />
      </div>
      <form id='SearchForm' className='Search' onSubmit={googleSearch}>
        <input type='text' id="search" placeholder='Google Search' className='rounded-5 shadow' />
        <button className='btn rounded-5 border-black ms-3' type="submit"><i className="fa-solid fa-magnifying-glass fa-lg" /></button>
      </form>

      <h3>Categories</h3>

      <div className='Categories'>
        {/* <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#GeneralModal">
          General
        </button>
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#RailwayModal">
          Railway
        </button>
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#BankModal">
          Bank
        </button>
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#MultiMediaModal`}>
          MulitMedia
        </button>
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#OtherModal">
          Other
        </button> */}
        {
          AllCategory.map((category, idx) => (
            <button
              key={idx}
              type="button"
              className="btn "
              onClick={() => OpenCategory(category)}
              data-bs-toggle="modal"
              data-bs-target="#SelectedCategoriesModal"
            >
              {category.Category}
            </button>
          ))
        }
      </div>




      {SelectedCategory && (
        <div className="modal fade" id="SelectedCategoriesModal" tabIndex="-1" aria-labelledby="SelectedCategoriesModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="SelectedCategoriesModalLabel">{SelectedCategory.Category}</h1>
                <button type="button" onClick={CloseCategory} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body row">
                {AllSite
                  .filter(site => site.SiteCategory === SelectedCategory.Category)
                  .map((Element, idx) => (
                    <div className="Site col-2" key={idx}>
                      <a href={Element.SiteUrl}>
                        <img src={Element.SiteLogo} alt='...' />
                        {Element.SiteName}
                      </a>
                    </div>
                  ))}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={CloseCategory} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h3 className='mt-5'>All Sites</h3>
      <div className='Bookmarks'>
        {/* Monog DB - Backend  */}
        {
          AllSite.map((Element, idx) => {
            return (
              <div className='Site' key={idx}>
                <a href={Element.SiteUrl}>
                  <img src={Element.SiteLogo} alt='...' />
                  <p>{Element.SiteName}</p>
                </a>
              </div>
            )
          })
        }
      </div>

      {/* Categores Modals */}
      <div className="modal fade" id="MultiMediaModal" tabIndex="-1" aria-labelledby="MultiMediaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="MultiMediaModalLabel">MultiMedia</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('MultiMedia')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
                {
                  AllSite.filter(f => f.SiteCategory.includes('MultiMedia')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="GeneralModal" tabIndex="-1" aria-labelledby="GeneralModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h1 className="modal-title fs-5" id="GeneralModalLabel">General</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                {/* Monog DB - Backend  */}
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('General')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
                {
                  AllSite.filter(f => f.SiteCategory.includes('General')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="RailwayModal" tabIndex="-1" aria-labelledby="RailwayModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="RailwayModalLabel">Railway</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('Railway')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
                {
                  AllSite.filter(f => f.SiteCategory.includes('Railway')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="BankModal" tabIndex="-1" aria-labelledby="BankModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="BankModalLabel">Bank</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('Bank')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
                {
                  AllSite.filter(f => f.SiteCategory.includes('Bank')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="OtherModal" tabindex="-1" aria-labelledby="OtherModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="OtherModalLabel">Other</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className='row'>
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('Other')).map((Element, idx) => {
                    return (
                      <div className='Site col-2 ' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
                {
                  AllSite.filter(f => f.SiteCategory.includes('Other')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
