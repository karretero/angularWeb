import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
export interface SeoInterface{
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  keywords: string;
  published: string;
  modified: string;
}

export enum NgxSeoMetaTagAttr {
  name = 'name',
  property = 'property'
}

export interface NgxSeoMetaTag {
  attr: NgxSeoMetaTagAttr;
  attrValue: string;
  value?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    // tslint:disable-next-line: variable-name
    @Inject(DOCUMENT) private readonly _document: Document,
  ) {
  }

  public setData(data: SeoInterface): void {

    this.setKeywords(data.keywords);
    this.setTitle(data.title);
    this.setDescription(data.description);
  }

  public setKeywords(keywords: string): void {
    if (Boolean(keywords)) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    } else {
      this.meta.removeTag(`name='keywords'`);
    }
  }



  public setTitle(title: string = '') {
    this.title.setTitle(title);
    if (title && title.length) {
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:image:alt', content: title });
      this.meta.updateTag({ property: 'og:image:alt', content: title });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ name: 'title', content: title });
    } else {
      this.meta.removeTag(`name='twitter:title'`);
      this.meta.removeTag(`name='twitter:image:alt'`);
      this.meta.removeTag(`property='og:image:alt'`);
      this.meta.removeTag(`property='og:title'`);
      this.meta.removeTag(`name='title'`);
    }
  }

  public setType(type?: string) {
    if (type && type.length) {
      this.meta.updateTag({ property: 'og:type', content: type });
    } else {
      this.meta.removeTag(`property='og:type'`);
    }
  }

  public setDescription(description?: string) {
    if (description && description.length) {
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'description', content: description });
    } else {
      this.meta.removeTag(`name='twitter:description'`);
      this.meta.removeTag(`property='og:description'`);
      this.meta.removeTag(`name='description'`);
    }
  }

  public setImage(image?: string) {
    if (image && image.length) {
      this.meta.updateTag({ name: 'twitter:image', content: image });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
    } else {
      this.meta.removeTag(`name='twitter:image'`);
      this.meta.removeTag(`property='og:image'`);
      this.meta.removeTag(`property='og:image:height'`);
    }
  }



  public setPublished(publishedDateString?: string) {
    if (publishedDateString) {
      const publishedDate = new Date(publishedDateString);
      this.meta.updateTag({ name: 'article:published_time', content: publishedDate.toISOString() });
      this.meta.updateTag({ name: 'published_date', content: publishedDate.toISOString() });
    } else {
      this.meta.removeTag(`name='article:published_time'`);
      this.meta.removeTag(`name='publication_date'`);
    }
  }

  public setModified(modifiedDateString?: string) {
    if (modifiedDateString) {
      const modifiedDate = new Date(modifiedDateString);
      this.meta.updateTag({ name: 'article:modified_time', content: modifiedDate.toISOString() });
      this.meta.updateTag({ name: 'og:updated_time', content: modifiedDate.toISOString() });
    } else {
      this.meta.removeTag(`name='article:modified_time'`);
      this.meta.removeTag(`name='og:updated_time'`);
    }
  }

  public setAuthor(author?: string) {
    if (author && author.length) {
      this.meta.updateTag({ name: 'article:author', content: author });
      this.meta.updateTag({ name: 'author', content: author });
    } else {
      this.meta.removeTag(`name='article:author'`);
      this.meta.removeTag(`name='author'`);
    }
  }


  public setMetaTag(metaTag: NgxSeoMetaTag): void {
    if (Boolean(metaTag.value)) {
      const metaTagObject :any= {
        [metaTag.attr]: metaTag.attrValue,
        content: metaTag.value,
      };
      this.meta.updateTag(metaTagObject );
    } else {
      const selector = `${metaTag.attr}='${metaTag.attrValue}'`;
      this.meta.removeTag(selector);
    }
  }

  public setMetaTags(metaTags: NgxSeoMetaTag[]): void {
    for (const metaTag of metaTags) {
      this.setMetaTag(metaTag);
    }
  }



}
