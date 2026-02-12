import { NewspaperIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import NewsFilter from "../components/News/NewsFilter";
import NewsCard from "../components/News/NewsCard";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const BASE_URL = "https://newsdata.io/api/1/latest";
const API_KEY = import.meta.env.VITE_API_KEY;

const TechNewsPage = () => {
  const { news, setNews, searchQuery } = useContext(AppContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const params = new URLSearchParams({
          apikey: API_KEY, language: "en", category: "technology", size: "10",
        });
        if (searchQuery) params.append("q", searchQuery.trim());
        else params.append("q", "technology OR software OR AI OR programming OR startup");
        const { data } = await axios.get(BASE_URL + "?" + params);
        if (data.status === "success") setNews(data.results);
      } catch (error) { console.error("Failed to fetch news:", error); }
    };
    fetchNews();
  }, [searchQuery, setNews]);

  return (
    <section className="page-container flex flex-col gap-8">
      <PageHeader Icon={NewspaperIcon} title="Tech News" description="Stay updated with the latest in tech" />
      <NewsFilter />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Latest News</h2>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>{news.length} articles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.length > 0 ? (
            news.map((article) => <NewsCard key={article.article_id} article={article} />)
          ) : (
            <div className="col-span-full text-center" style={{ color: "var(--text-muted)" }}>
              No news articles found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechNewsPage;
