import React, { useEffect, useState} from "react";
import {
    IonBadge,
    IonCard, IonCardContent, IonCardTitle,
    IonCol,
    IonContent, IonFab, IonFabButton,
    IonGrid,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel, IonList, IonListHeader,
    IonPage,
    IonRow,
    IonTitle,
} from "@ionic/react";
import {useParams} from "react-router";
import {Recipe} from "../data/Storage";
import {initialRecipes} from "../data/Storage";
import {
    arrowBack,
    caretForwardOutline,
    checkmarkDoneOutline,
    restaurantOutline,
    speedometerOutline,
    timeOutline
} from "ionicons/icons";

export const Details: React.FC = () => {

    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
    const {recipe_id} = useParams<{ recipe_id?: string }>();
    const [id, setId] = useState<number|null> (null);

    useEffect(() => {
        if (recipe_id) {
            setId(Number(recipe_id));
        }
    }, [recipe_id])

    useEffect(() => {
        if (!recipe_id) return;
        setCurrentRecipe(() => [...recipes].find(r => r.id === parseInt(recipe_id)));
    }, [])
    const difficultyColor = (d: string): 'success' | 'warning' | 'danger' | 'medium' => {
        const v = d.toLowerCase();
        if (v === 'easy') return 'success';
        if (v === 'medium') return 'warning';
        if (v === 'hard') return 'danger';
        return 'medium';
    };
    return (
        <IonPage>
            {currentRecipe && (
                <IonHeader>
                    <IonTitle className="ion-padding">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <IonIcon icon={restaurantOutline} style={{ fontSize: '1.75rem', color: 'var(--ion-color-primary)' }} />
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: 0.3 }}>
                                    {currentRecipe.title}
                                </span>
                        </div>
                    </IonTitle>

                </IonHeader>
            )}
                <IonContent fullscreen>
                    {currentRecipe && (
                        <IonGrid>
                    <IonRow>
                        <IonCol size="12" >
                            <IonCard className="ion-padding">
                                {currentRecipe.image ? (
                                    <IonImg
                                        className="ion-margin-bottom"
                                        src={currentRecipe.image}
                                        alt={currentRecipe.title}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16 / 9',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : null}

                                <IonCardTitle>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <IonIcon icon={restaurantOutline} style={{ fontSize: 22, color: 'var(--ion-color-primary)' }} />
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>
                                                {currentRecipe.title}
                                            </span>
                                    </div>
                                </IonCardTitle>


                                <IonCardContent>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                                        <IonBadge color={difficultyColor(currentRecipe.difficulty)} style={{ textTransform: 'capitalize' }}>
                                            <IonIcon icon={speedometerOutline} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                            {currentRecipe.difficulty}
                                        </IonBadge>

                                        <IonBadge color="primary">
                                            <IonIcon icon={timeOutline} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                            {currentRecipe.duration} min
                                        </IonBadge>
                                    </div>

                                    <IonList inset>
                                        <IonListHeader>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <IonIcon icon={restaurantOutline} style={{ fontSize: 22, color: 'var(--ion-color-primary)' }} />
                                                <IonLabel style={{ fontWeight: 700, letterSpacing: 0.2 }}>Ingredients</IonLabel>
                                            </div>
                                        </IonListHeader>
                                        {currentRecipe.ingredients.map((ing, idx) => (
                                            <IonItem key={idx} lines="none" className="ion-padding-start">
                                                <IonLabel><IonIcon icon={caretForwardOutline}/> {ing}</IonLabel>
                                            </IonItem>
                                        ))}
                                    </IonList>


                                    <div style={{ marginTop: 16 }}>
                                        <IonList inset>
                                            <IonListHeader>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <IonIcon icon={checkmarkDoneOutline} style={{ fontSize: 22, color: 'var(--ion-color-success)' }} />
                                                    <IonLabel style={{ fontWeight: 700, letterSpacing: 0.2 }}>Steps</IonLabel>
                                                </div>
                                            </IonListHeader>
                                            {currentRecipe.steps.map((step, idx) => (
                                                <IonItem key={idx} lines="none" className="ion-padding-start">
                                                    <IonBadge slot="start" color="medium" style={{ minWidth: 22, textAlign: 'center' }}>
                                                        {idx + 1}
                                                    </IonBadge>
                                                    <IonLabel style={{ lineHeight: 1.4 }}>{step}</IonLabel>
                                                </IonItem>
                                            ))}
                                        </IonList>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>)}
                    <IonFab vertical="bottom" horizontal="center" slot="fixed">
                        <IonFabButton routerLink="/home">
                            <IonIcon icon={arrowBack} />
                        </IonFabButton>
                    </IonFab>
                </IonContent>
        </IonPage>
    );
}
