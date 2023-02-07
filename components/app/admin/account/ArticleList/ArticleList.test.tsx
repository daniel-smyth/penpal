import fetchMock from "jest-fetch-mock";
import { screen } from "@testing-library/react";
import { customSWRRender } from "@tests/utils";
import { fetcher, mockArticleList, mockNextRouter } from "@tests/mocks";
import ArticleList from "./ArticleList";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.once(JSON.stringify(mockArticleList));
  mockNextRouter({ pathname: "/profile", asPath: "/profile" });
});

describe("Article List", () => {
  it("renders all articles", async () => {
    customSWRRender(<ArticleList />);
    for (let i = 0; i < mockArticleList.length; i++) {
      const article = mockArticleList[i];
      expect(await screen.findByText(article.title)).toBeInTheDocument();
    }
  });

  // it('deletes article', async () => {
  //   fetchMock.once(JSON.stringify(mockArticleList));
  //   customSWRRender(<ArticleList />);
  //   const deleteButton = (await screen.findAllByText('Delete'))[0];
  //   deleteButton.click();

  //   expect(fetcher).toHaveBeenCalledWith({
  //     url: `/api/article?id=${mockArticleList[0]._id}`,
  //     method: 'DELETE'
  //   });

  //   const articles = await screen.findAllByText('Delete');
  //   expect(articles.length).toEqual(mockArticleList.length - 1);
  // });
});
