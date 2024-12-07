from diagrams import Diagram, Edge
from diagrams.onprem.client import User
from diagrams.onprem.compute import Server
from diagrams.onprem.database import Mongodb
from diagrams.programming.framework import React
from diagrams.onprem.network import Nginx

with Diagram("JobScanner DFD (Level 1)", show=True):

    # Components
    user = User("User")
    frontend = React("Frontend (React)")
    backend = Server("Backend (Node.js + Express)")
    mongodb = Mongodb("MongoDB")
    
    # Web Scraping API as a general element
    web_scraping = Server("Web Scraping APIs")

    # Job platforms
    linkedin = Server("LinkedIn")
    monster = Server("Monster")
    stepstone = Server("StepStone")
    indeed = Server("Indeed")

    # User interaction
    user >> Edge(label="Job Title, Location, Filters") >> frontend
    frontend >> Edge(label="Search Query") >> backend
    
    # Backend process
    backend >> Edge(label="Real-time Job Scraping Request") >> web_scraping
    web_scraping >> Edge(label="Scraped Jobs") >> backend
    
    # Scraping platforms
    web_scraping >> linkedin
    web_scraping >> monster
    web_scraping >> stepstone
    web_scraping >> indeed
    
    # Data storage and retrieval
    backend >> Edge(label="Store Listings") >> mongodb
    mongodb >> Edge(label="Retrieve Listings") >> backend

    # Frontend display
    backend >> Edge(label="Filtered Job Listings") >> frontend
    frontend >> Edge(label="Display Listings") >> user
