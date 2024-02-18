import './style.css'
import React, { useEffect, useState } from 'react'
import Logo from './Images/Google-Logo.png'
import axios from 'axios'

// Local Storage - Frontend

// const AllSiteStorage = () => {
//   let AllSites = localStorage.getItem('AllSites');
//   if (AllSites) {
//     return (
//       JSON.parse(localStorage.getItem('AllSites'))
//     )
//   }
//   else {
//     return [];
//   }
// }

const ThemeStored = () => {
  let Theme = localStorage.getItem('Theme');
  if (Theme) {
    return (
      JSON.parse(localStorage.getItem('Theme'))
    )
  }
  else {
    return [];
  }
}

export default function AdministratorPage() {

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


  // LocalStorage - Frontend

  // const [AllSite, setAllSite] = useState(AllSiteStorage);

  // const addSite = () => {
  //   if (!Site.SiteUrl) {

  //   }
  //   else {
  //     setAllSite([...AllSite, Site]);
  //   }
  // }

  // useEffect(() => {
  //   localStorage.setItem('AllSites', JSON.stringify(AllSite))
  // }, [AllSite]);

  const googleSearch = (event) => {
    event.preventDefault();
    var text = document.getElementById("search").value;
    var cleanQuery = text.replace(" ", "+", text);
    var url = "http://www.google.com/search?q=" + cleanQuery;

    window.location.href = url;
  }

  // Input Data
  const [Site, setSite] = useState({
    SiteName: ' ',
    SiteUrl: ' ',
    SiteLogo: ' ',
    SiteCategory: ' '
  });

  const [ Category, setCategory] = useState({
    Category:' '
  })

  const AddNewCategory = async (e) => {
    e.preventDefault();
    try {
        await axios.post("https://vv-development-web-page-server.vercel.app/AddNewCategory", { ...Category })
            .then(result => {
                console.log(result);
                alert("Added");
                window.location.reload();
            })
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error + 'not added');
    }
}

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

  // Post Data to Backend MongoDb
  const PostToBackend = async (e) => {

    try {
      await axios.post("https://vv-development-web-page-server.vercel.app/Sites", { ...Site })
        .then(result => console.log(result))
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error + 'not added');
    }

    alert("Added");
  }

  //Output Data
  const [AllSite, setAllSite] = useState([]);

  //Get Data from Backend MongoDB
  useEffect(() => {
    axios.get('https://vv-development-web-page-server.vercel.app/GetSites')
      .then(result => setAllSite(result.data))
      .catch(error => console.log(error))
  }, []);

  //Delete Data from Backend MongoDB
  const DeleteSite = async (id) => {
    axios.delete('https://vv-development-web-page-server.vercel.app/DeleteSite/' + id)
      .then(result => {
        console.log(result)
        window.location.reload();
      })
      .catch(error => console.log(error))
  }

  // eslint-disable-next-line
  const [Theme, setTheme] = useState(ThemeStored);
  useEffect(() => {
    localStorage.setItem('Theme', JSON.stringify(Theme))
  }, [Theme]);

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
        {/* <button type="button" className="btn col-2" data-bs-toggle="modal" data-bs-target="#GeneralModal">
          General
        </button>
        <button type="button" className="btn col-2" data-bs-toggle="modal" data-bs-target="#RailwayModal">
          Railway
        </button>
        <button type="button" className="btn col-2" data-bs-toggle="modal" data-bs-target="#BankModal">
          Bank
        </button>
        <button type="button" className="btn col-2" data-bs-toggle="modal" data-bs-target={`#MultiMediaModal`}>
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
      className="btn"
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
        <div className="modal-body">
          {AllSite
            .filter(site => site.SiteCategory === SelectedCategory.Category)
            .map((Element, idx) => (
              <div className="Site col-2" key={idx}>
                <a href={Element.SiteUrl}>
                  <img src={Element.SiteLogo} alt='...' />
                  {Element.SiteName}
                </a>
                <button className="btn rounded-circle" onClick={() => DeleteSite(Element._id)}>
                  <i className="fa-solid fa-trash fa-sm" />
                </button>
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
      <div className='Bookmarks row'>
        {/* Monog DB - Backend  */}
        {
          AllSite.map((Element, idx) => {
            return (
              <div className='Site col-2' key={idx}>
                <a href={Element.SiteUrl}>
                  <img src={Element.SiteLogo} alt='...' />
                  {Element.SiteName}
                </a>
                <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
              </div>
            )
          })
        }
        {/* LocalStorage - Frontend */}
        {
          // AllSite.map((Element, idx) => {
          //   return (
          //     <div className={'Site col-2'} key={idx}>
          //       <a href={Element.SiteUrl}>
          //         <img src={Element.SiteLogo} alt='...' />
          //         {Element.SiteName}
          //       </a>
          //     </div>
          //   )
          // })
        }
        <button className='btn Add col-2' type="button" data-bs-toggle="modal" data-bs-target="#AddSiteModal">
          <div className='Add-icon'>
            <i className="fa-solid fa-plus fa-2xl" />
          </div>
          Add
        </button>
      </div>

      {/* Categories Modals */}
      <div className="modal fade" id="MultiMediaModal" tabIndex="-1" aria-labelledby="MultiMediaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="MultiMediaModalLabel">MultiMedia</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-2">
              <div className='row'>
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('MultiMedia')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          {Element.SiteName}
                        </a>
                        <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                          {Element.SiteName}
                        </a>
                        <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
              <div className=' row'>
                {/* Monog DB - Backend  */}
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('General')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          {Element.SiteName}
                        </a>
                        <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                          {Element.SiteName}
                        </a>
                        <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                        {Element.SiteName}
                      </a>
                      <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                        {Element.SiteName}
                      </a>
                      <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                        {Element.SiteName}
                      </a>
                      <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                        {Element.SiteName}
                      </a>
                      <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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

      {/* Add Site Modal */}
      <div className="modal fade" id="AddSiteModal" tabIndex="-1" aria-labelledby="AddSiteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={PostToBackend}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="AddSiteModalLabel">Add Site</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label>
                  Site Name: <input type='text' value={Site.SiteName} onChange={(event) => setSite({ ...Site, SiteName: event.target.value })} placeholder='Name'></input>
                  Site URL: <input type='text' value={Site.SiteUrl} onChange={(event) => setSite({ ...Site, SiteUrl: event.target.value })} placeholder='URL'></input>
                  Site Logo: <input type='text' value={Site.SiteLogo} onChange={(event) => setSite({ ...Site, SiteLogo: event.target.value })} placeholder='Logo Link'></input>
                  Site Category:
                  <select onChange={(event) => setSite({ ...Site, SiteCategory: event.target.value })}>
                    <option value="null"></option>
                    {
                      AllCategory.map((Element,idx) => {
                        return (
                          <option key={idx} value={Element.Category}>{Element.Category}</option>
                        )
                      })
                    }
                  </select>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" value="submit" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
              </div>
            </div>
          </form>
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
              <div className='row px-3'>
                {
                  DefaultSite.filter(f => f.SiteCategory.includes('Other')).map((Element, idx) => {
                    return (
                      <div className='Site col-2' key={idx}>
                        <a href={Element.SiteUrl}>
                          <img src={Element.SiteLogo} alt='...' />
                          <p>{Element.SiteName}</p>
                        </a>
                        <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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
                        <button className='btn rounded-circle' onClick={() => DeleteSite(Element._id)}><i className="fa-solid fa-trash fa-sm" /></button>
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

      <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#AddNewCategoryModal">Add New Category</button>


                <div className="modal fade" id="AddNewCategoryModal" tabIndex="-1" aria-labelledby="AddNewCategoryModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={AddNewCategory}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="AddNewCategoryModalLabel">Add New Category</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type='text' placeholder='Category Name' value={Category.Category} onChange={(e) => setCategory({ ...Category, Category: e.target.value })} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

    </div >
  )
}
