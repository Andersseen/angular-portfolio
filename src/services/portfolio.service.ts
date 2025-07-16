import portfolioJson from '@/assets/data/portfolio.json';
import { PortfolioData } from '@/shared/types';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioData = signal<PortfolioData | null>(null);

  readonly data = this.portfolioData.asReadonly();

  constructor() {
    this.loadPortfolioData();
  }

  private async loadPortfolioData() {
    this.portfolioData.set(portfolioJson as PortfolioData);
  }

  get personalInfo() {
    return this.portfolioData()?.personal || null;
  }

  get socialLinks() {
    return this.portfolioData()?.socialLinks || [];
  }

  get skills() {
    return this.portfolioData()?.skills || [];
  }

  get projects() {
    return this.portfolioData()?.projects || [];
  }

  get featuredProjects() {
    return this.projects.filter((project) => project.featured);
  }

  get experience() {
    return this.portfolioData()?.experience || [];
  }

  get education() {
    return this.portfolioData()?.education || [];
  }

  get certifications() {
    return this.portfolioData()?.certifications || [];
  }

  getSkillsByCategory(category: string) {
    return this.skills.filter((skill) => skill.category === category);
  }

  getProjectsByCategory(category: string) {
    return this.projects.filter((project) => project.category === category);
  }
}
