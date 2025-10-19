import {
    IonBadge, IonButton, IonButtons,
    IonCard, IonCardContent,
    IonCardHeader,
    IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonImg,
    IonPage, IonRow,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import {add, moon, restaurantOutline, speedometerOutline, sunny, timeOutline} from "ionicons/icons";
import {getRecipes, initialRecipes, Recipe} from "../data/Storage";
import React, {useEffect, useState} from "react";
import {useDarkMode} from "../hooks/useDarkMode";


export const Home: React.FC = () => {

   const [initRecipes, setInitRecipes] = useState<Recipe[]>(initialRecipes);
   const [recipes, setRecipes] = useState<Recipe[]>(initRecipes);
   const {isDark, toggleDarkMode} = useDarkMode();

   async function loadRecipes() {
       const storedRecipes: Recipe[] = await getRecipes();
       const totalRecipes = storedRecipes.concat(initRecipes);
       setRecipes(totalRecipes);
   }

    useEffect(() => {
       loadRecipes();
    }, []);

    useIonViewWillEnter(() => {
        loadRecipes();
    });


    const difficultyColor = (d: string): 'success' | 'warning' | 'danger' | 'medium' => {
        const v = d.toLowerCase();
        if (v === 'easy') return 'success';
        if (v === 'medium') return 'warning';
        if (v === 'hard') return 'danger';
        return 'medium';
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>👨‍🍳 Recipes App</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={toggleDarkMode}
                            aria-label={isDark ? 'Deactivate Dark Mode' : 'Activate Dark Mode'}
                        >
                            <IonIcon slot="icon-only" icon={isDark ? sunny : moon} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IonButton className="ion-margin-top" aria-label="Add a recipe" routerLink="/add" color="primary">
                        <IonIcon slot="icon-only" icon={add} />
                    </IonButton>
                </div>
                {recipes.length === 0 && (
                    <IonCard style={{ textAlign: 'center', padding: 24, boxShadow: 'none', border: '1px dashed var(--ion-color-medium)', borderRadius: 12 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                            <IonIcon icon={restaurantOutline} style={{ fontSize: 48, color: 'var(--ion-color-medium)' }} />
                            <IonCardHeader style={{ padding: 0 }}>
                                <IonCardTitle style={{ fontSize: '1.25rem', fontWeight: 800 }}>No recipes yet</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent style={{ paddingTop: 0 }}>
                                <p style={{ color: 'var(--ion-color-medium-shade)', margin: '0 0 16px' }}>
                                    Start by adding your first delicious recipe.
                                </p>
                                <IonButton color="primary" routerLink="/home" shape="round">
                                    <IonIcon slot="start" icon={add} />
                                    Add a recipe
                                </IonButton>
                            </IonCardContent>
                        </div>
                    </IonCard>
                )}
                {recipes.length > 0 && (
                    <IonGrid>
                        <IonRow>
                            {recipes.map((r) => (
                                <IonCol className="ion-padding" key={r.id} size="12" size-md="6" size-lg="4">
                                    <IonCard style={{height: '100%'}} className="ion-no-margin"
                                             routerLink={`/recipes/${r.id}`}>
                                        {r.image ? (
                                            <IonImg style={{
                                                width: '100%',
                                                aspectRatio: '16 / 9',
                                                objectFit: 'cover'
                                            }}
                                                    src={r.image} alt={r.title}/>
                                        ) : null}

                                        <IonCardHeader>
                                            <IonCardTitle
                                                style={{fontSize: '1.1rem', lineHeight: 1.2}}>{r.title}</IonCardTitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                            <div className="ion-justify-content-start ion-align-items-center"
                                                 style={{display: 'flex', gap: 6}}>
                                                <IonBadge color={difficultyColor(r.difficulty)}
                                                          style={{textTransform: 'capitalize'}}>
                                                    <IonIcon icon={speedometerOutline}
                                                             style={{marginRight: 6, verticalAlign: 'middle'}}/>
                                                    {r.difficulty}
                                                </IonBadge>

                                                <IonBadge color="primary">
                                                    <IonIcon icon={timeOutline}
                                                             style={{marginRight: 6, verticalAlign: 'middle'}}/>
                                                    {r.duration} min
                                                </IonBadge>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                )}
            </IonContent>
        </IonPage>
    );
};




