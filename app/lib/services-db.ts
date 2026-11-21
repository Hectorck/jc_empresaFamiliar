import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  orderBy,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type {
  Content,
  Service,
  Conference,
  ServiceFormData,
  ConferenceFormData,
  ContentType,
  ContentStatus,
  Speaker,
  SpeakerFormData,
} from "./services-types";

const SERVICES_COLLECTION = "services";

// Funciones auxiliares
function cleanUndefinedDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefinedDeep);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, cleanUndefinedDeep(v)])
    );
  }
  return obj;
}

function mapContentDoc(docSnap: QueryDocumentSnapshot<DocumentData>): Content {
  return { ...docSnap.data(), id: docSnap.id } as Content;
}

// Obtener todos los contenidos (servicios y conferencias)
export async function obtenerContenidos(options?: {
  type?: ContentType;
  status?: ContentStatus;
  featured?: boolean;
  limit?: number;
}): Promise<Content[]> {
  try {
    let q = query(collection(db, SERVICES_COLLECTION));

    if (options?.type) {
      q = query(q, where("type", "==", options.type));
    }

    if (options?.status) {
      q = query(q, where("status", "==", options.status));
    }

    if (options?.featured !== undefined) {
      q = query(q, where("featured", "==", options.featured));
    }

    if (options?.limit) {
      q = query(q, limit(options.limit));
    }

    q = query(q, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapContentDoc);
  } catch (error) {
    console.error("[obtenerContenidos] Error:", error);
    throw error;
  }
}

// Obtener solo servicios
export async function obtenerServicios(options?: {
  status?: ContentStatus;
  featured?: boolean;
  limit?: number;
}): Promise<Service[]> {
  const contenidos = await obtenerContenidos({
    type: "service",
    ...options,
  });
  return contenidos as Service[];
}

// Obtener solo conferencias
export async function obtenerConferencias(options?: {
  status?: ContentStatus;
  featured?: boolean;
  limit?: number;
}): Promise<Conference[]> {
  const contenidos = await obtenerContenidos({
    type: "conference",
    ...options,
  });
  return contenidos as Conference[];
}

// Obtener contenido por slug
export async function obtenerContenidoPorSlug(slug: string): Promise<Content | null> {
  try {
    const q = query(
      collection(db, SERVICES_COLLECTION),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn(`[obtenerContenidoPorSlug] Content not found for slug: ${slug}`);
      return null;
    }

    return mapContentDoc(snapshot.docs[0]);
  } catch (error) {
    console.error("[obtenerContenidoPorSlug] Error:", error);
    return null; // Retornar null en lugar de lanzar error
  }
}

// Obtener contenido por ID
export async function obtenerContenidoPorId(id: string): Promise<Content | null> {
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return mapContentDoc(docSnap);
  } catch (error) {
    console.error("[obtenerContenidoPorId] Error:", error);
    throw error;
  }
}

// Guardar servicio (crear o actualizar)
export async function guardarServicio(
  servicio: ServiceFormData,
  id?: string
): Promise<string> {
  try {
    const docId = id || servicio.slug;
    const docRef = doc(db, SERVICES_COLLECTION, docId);

    const dataToSave = {
      ...servicio,
      type: "service" as ContentType,
      id: docId,
      updatedAt: Date.now(),
      createdAt: id ? undefined : Date.now(),
    };

    await setDoc(docRef, cleanUndefinedDeep(dataToSave), { merge: !!id });

    console.log(`[guardarServicio] Servicio guardado: ${docId}`);
    return docId;
  } catch (error) {
    console.error("[guardarServicio] Error:", error);
    throw error;
  }
}

// Guardar conferencia (crear o actualizar)
export async function guardarConferencia(
  conferencia: ConferenceFormData,
  id?: string
): Promise<string> {
  try {
    const docId = id || conferencia.slug;
    const docRef = doc(db, SERVICES_COLLECTION, docId);

    const dataToSave = {
      ...conferencia,
      type: "conference" as ContentType,
      id: docId,
      updatedAt: Date.now(),
      createdAt: id ? undefined : Date.now(),
    };

    await setDoc(docRef, cleanUndefinedDeep(dataToSave), { merge: !!id });

    console.log(`[guardarConferencia] Conferencia guardada: ${docId}`);
    return docId;
  } catch (error) {
    console.error("[guardarConferencia] Error:", error);
    throw error;
  }
}

// Actualizar contenido
export async function actualizarContenido(
  id: string,
  data: Partial<Content>
): Promise<void> {
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    await updateDoc(docRef, {
      ...cleanUndefinedDeep(data),
      updatedAt: Date.now(),
    });
    console.log(`[actualizarContenido] Contenido actualizado: ${id}`);
  } catch (error) {
    console.error("[actualizarContenido] Error:", error);
    throw error;
  }
}

// Eliminar contenido
export async function eliminarContenido(id: string): Promise<void> {
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    await deleteDoc(docRef);
    console.log(`[eliminarContenido] Contenido eliminado: ${id}`);
  } catch (error) {
    console.error("[eliminarContenido] Error:", error);
    throw error;
  }
}

// Verificar si un slug existe
export async function verificarSlug(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, SERVICES_COLLECTION),
      where("slug", "==", slug)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return false;
    }

    // Si se proporciona excludeId, verificar que no sea el mismo documento
    if (excludeId && snapshot.docs[0].id !== excludeId) {
      return true;
    }

    return !excludeId;
  } catch (error) {
    console.error("[verificarSlug] Error:", error);
    return false;
  }
}

// Generar slug único
export async function generarSlugUnico(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let counter = 1;
  let uniqueSlug = slug;

  while (await verificarSlug(uniqueSlug, excludeId)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

// ================== SPEAKERS (CONFERENCISTAS) ==================

const SPEAKERS_COLLECTION = "speakers";

// Obtener todos los conferencistas
export async function obtenerSpeakers(options?: {
  status?: 'active' | 'inactive';
}): Promise<Speaker[]> {
  try {
    let q = query(collection(db, SPEAKERS_COLLECTION));

    if (options?.status) {
      q = query(q, where("status", "==", options.status));
    }

    q = query(q, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Speaker));
  } catch (error) {
    console.error("[obtenerSpeakers] Error:", error);
    return []; // Retornar array vacío en lugar de lanzar error
  }
}

// Obtener conferencista por ID
export async function obtenerSpeakerPorId(id: string): Promise<Speaker | null> {
  try {
    const docRef = doc(db, SPEAKERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn(`[obtenerSpeakerPorId] Speaker not found: ${id}`);
      return null;
    }

    return { ...docSnap.data(), id: docSnap.id } as Speaker;
  } catch (error) {
    console.error("[obtenerSpeakerPorId] Error:", error);
    return null; // Retornar null en lugar de lanzar error
  }
}

// Guardar conferencista (crear o actualizar)
export async function guardarSpeaker(
  speaker: SpeakerFormData,
  id?: string
): Promise<string> {
  try {
    const docId = id || `speaker-${Date.now()}`;
    const docRef = doc(db, SPEAKERS_COLLECTION, docId);

    const dataToSave = {
      ...speaker,
      id: docId,
      updatedAt: Date.now(),
      createdAt: id ? undefined : Date.now(),
    };

    await setDoc(docRef, cleanUndefinedDeep(dataToSave), { merge: !!id });

    console.log(`[guardarSpeaker] Conferencista guardado: ${docId}`);
    return docId;
  } catch (error) {
    console.error("[guardarSpeaker] Error:", error);
    throw error;
  }
}

// Actualizar conferencista
export async function actualizarSpeaker(
  id: string,
  data: Partial<Speaker>
): Promise<void> {
  try {
    const docRef = doc(db, SPEAKERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...cleanUndefinedDeep(data),
      updatedAt: Date.now(),
    });
    console.log(`[actualizarSpeaker] Conferencista actualizado: ${id}`);
  } catch (error) {
    console.error("[actualizarSpeaker] Error:", error);
    throw error;
  }
}

// Eliminar conferencista
export async function eliminarSpeaker(id: string): Promise<void> {
  try {
    const docRef = doc(db, SPEAKERS_COLLECTION, id);
    await deleteDoc(docRef);
    console.log(`[eliminarSpeaker] Conferencista eliminado: ${id}`);
  } catch (error) {
    console.error("[eliminarSpeaker] Error:", error);
    throw error;
  }
}
