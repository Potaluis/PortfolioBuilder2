import { db } from '@/services/firebase';
import { PublicProfile } from '@/types/profiles';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    query,
    updateDoc,
    where
} from 'firebase/firestore';

export const profileService = {
  // Obtener perfiles públicos
  async getPublicProfiles(filters?: {
    featured?: boolean;
    skills?: string[];
    searchText?: string;
    limit?: number;
  }): Promise<PublicProfile[]> {
    try {
      let q = query(collection(db, 'profiles'), where('published', '==', true));

      if (filters?.featured) {
        q = query(q, where('featured', '==', true));
      }

      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const snapshot = await getDocs(q);
      const profiles: PublicProfile[] = [];

      snapshot.forEach((doc) => {
        profiles.push({ id: doc.id, ...doc.data() } as PublicProfile);
      });

      // Aplicar filtros adicionales en cliente
      let filteredProfiles = profiles;

      if (filters?.searchText) {
        const search = filters.searchText.toLowerCase();
        filteredProfiles = filteredProfiles.filter(profile =>
          profile.name.toLowerCase().includes(search) ||
          profile.title.toLowerCase().includes(search) ||
          profile.description.toLowerCase().includes(search)
        );
      }

      if (filters?.skills && filters.skills.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile =>
          filters.skills!.some(skill => profile.skills.includes(skill))
        );
      }

      return filteredProfiles;
    } catch (error) {
      console.error('Error getting public profiles:', error);
      return [];
    }
  },

  // Incrementar vistas de un perfil
  async incrementProfileViews(profileId: string): Promise<void> {
    try {
      const profileRef = doc(db, 'profiles', profileId);
      await updateDoc(profileRef, {
        totalViews: increment(1),
        lastWeekViews: increment(1),
      });
    } catch (error) {
      console.error('Error incrementing profile views:', error);
    }
  },

  // Incrementar contactos de un perfil
  async incrementProfileContacts(profileId: string): Promise<void> {
    try {
      const profileRef = doc(db, 'profiles', profileId);
      await updateDoc(profileRef, {
        totalContacts: increment(1),
        lastWeekContacts: increment(1),
      });
    } catch (error) {
      console.error('Error incrementing profile contacts:', error);
    }
  },

  // Obtener perfil por ID
  async getProfileById(profileId: string): Promise<PublicProfile | null> {
    try {
      const profileRef = doc(db, 'profiles', profileId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        return { id: profileSnap.id, ...profileSnap.data() } as PublicProfile;
      }

      return null;
    } catch (error) {
      console.error('Error getting profile by ID:', error);
      return null;
    }
  },
};